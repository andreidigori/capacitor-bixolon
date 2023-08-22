package com.getcapacitor.community.bixolon.reflect;

import com.getcapacitor.JSArray;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Array;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

public class ReflectUtils {
    //https://github.com/apache/commons-lang
    private static final Map<Class<?>, Class<?>> wrapperPrimitiveMap = Map.of(
        Boolean.class, Boolean.TYPE,
        Byte.class, Byte.TYPE,
        Character.class, Character.TYPE,
        Short.class, Short.TYPE,
        Integer.class, Integer.TYPE,
        Long.class, Long.TYPE,
        Double.class, Double.TYPE,
        Float.class, Float.TYPE
    );

    public static ReflectionObject reflectArgument(Object input, HashMap<String, Object> hashMap) {
        var mainReflection = reflectValueOrNested(input, hashMap);
        var value = mainReflection.value;
        var classType = mainReflection.classType;

        if (value instanceof JSONArray valueAsArray) {
            var arrayLength = valueAsArray.length();
            var componentClassType = Object.class;

            if (input instanceof JSONObject inputAsObject && inputAsObject.has("componentClassType")) {
                try {
                    componentClassType = sanitizeWrapperClass(Class.forName(inputAsObject.optString("componentClassType")));
                } catch (ClassNotFoundException e) {

                }
            } else if (arrayLength > 0) {
                //Determine from first value
                var firstValue = valueAsArray.opt(0);
                var firstItemReflectionObject = reflectValueOrNested(firstValue, hashMap);
                componentClassType = firstItemReflectionObject.classType;
            }
            value = Array.newInstance(componentClassType, arrayLength);

            for (var i = 0; i < arrayLength; i++) {
                var valueAtIndex = valueAsArray.opt(i);

                if (valueAtIndex instanceof JSONObject valueAtIndexAsObject) {
                    if (valueAtIndexAsObject.has("hashKey")) {
                        var hashKey = valueAtIndexAsObject.optString("hashKey");
                        valueAtIndex = hashMap.get(hashKey);
                    } else {
                        //Pluck
                        valueAtIndex = valueAtIndexAsObject.opt("value");

                        if (JSONObject.NULL.equals(valueAtIndex)) {
                            valueAtIndex = null;
                        }
                    }
                }

                if (shouldCastToPritimive(valueAtIndex, componentClassType)) {
                    valueAtIndex = castNumberToPrimitive(valueAtIndex, componentClassType.getName());
                }

                Array.set(value, i, valueAtIndex);
            }
        }

        return new ReflectionObject(value, classType);
    }

    public static Object sanitizeArray(Object value) {
        var valueClass = value.getClass();

        if (!valueClass.isArray()) {
            return value;
        }

        //Thanks for example https://stackoverflow.com/questions/16427319/cast-object-to-array#answer-16428065
        var componentTypeClass = valueClass.getComponentType();

        var resultArray = new JSArray();

        if (componentTypeClass.isPrimitive()) {
            int length = Array.getLength(value);

            for (var i = 0; i < length; i++) {
                var valueAtIndex = Array.get(value, i);
                try {
                    resultArray.put(i, sanitizeArray(valueAtIndex));
                } catch (JSONException e) {
                    // Skip
                }
            }
        } else {
            var valueAsArray = (Object[]) value;
            for (var i = 0; i < valueAsArray.length; i++) {
                try {
                    resultArray.put(i, sanitizeArray(valueAsArray[i]));
                } catch (JSONException e) {
                    // Skip
                }
            }
        }

        return resultArray;
    }

    private static Class sanitizeWrapperClass(Class classType) {
        if (wrapperPrimitiveMap.containsKey(classType)) {
            return wrapperPrimitiveMap.get(classType);
        }

        return classType;
    }

    private static boolean shouldCastToPritimive(Object value, Class classType) {
        //e.g. Prevent casting an Integer to Integer
        return value instanceof Number && !sanitizeWrapperClass(value.getClass()).equals(classType);
    }

    private static Object castNumberToPrimitive(Object value, String primitiveType) {
        try {
            var convertMethod = Number.class.getMethod(primitiveType + "Value");
            return convertMethod.invoke(value);
        } catch (InvocationTargetException | NoSuchMethodException | IllegalAccessException e) {

        }
        return null;
    }

    private static ReflectionObject reflectValueOrNested(Object input, HashMap<String, Object> hashMap) {
        var value = input;
        var classType = sanitizeWrapperClass(value.getClass());

        if (value instanceof JSONObject valueAsObject) { //null or ModifiedNativePrimitive (extract value and classType) or HashNativeArgument (extract by hash)
            if (valueAsObject.has("hashKey")) {
                var hashKey = valueAsObject.optString("hashKey");
                value = hashMap.get(hashKey);

                if (value != null) {
                    classType = value.getClass();
                } else {
                    classType = Object.class;
                }
            } else {
                if (valueAsObject.has("value")) {
                    //Pluck
                    value = valueAsObject.opt("value");
                    classType = sanitizeWrapperClass(value.getClass());
                }

                if (JSONObject.NULL.equals(value)) {
                    value = null;
                    classType = Object.class;
                }
            }

            if (valueAsObject.has("classType")) {
                try {
                    //e.g. "java.lang.String" for String
                    //e.g. "[Ljava.lang.String;" for String[]
                    classType = sanitizeWrapperClass(Class.forName(valueAsObject.optString("classType")));
                } catch (ClassNotFoundException e) {
                    classType = Object.class;
                }
            }
        }

        if (shouldCastToPritimive(value, classType)) {
            value = castNumberToPrimitive(value, classType.getName());
        }

        return new ReflectionObject(value, classType);
    }
}
