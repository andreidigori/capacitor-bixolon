package com.getcapacitor.community.bixolon;

import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;

import com.bixolon.commonlib.connectivity.searcher.BXLNetwork;
import com.bixolon.commonlib.connectivity.searcher.BXLUsbDevice;
import com.bxl.config.editor.BXLConfigLoader;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.community.bixolon.reflect.ReflectUtils;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Proxy;
import java.util.HashMap;
import java.util.Iterator;
import java.util.UUID;

import jpos.BaseJposControl;
import jpos.JposException;
import jpos.config.JposEntry;

@CapacitorPlugin(name = "Bixolon")
public class BixolonPlugin extends Plugin {
    public HashMap<String, Object> valuesMap = new HashMap<>();

    private HashMap<String, BaseJposControl> controlsMap = new HashMap<>();
    private HashMap<String, Object> controlsListenerMap = new HashMap<>();
    private BXLConfigLoader configLoader;

    @Override
    public void load() {
        super.load();

        var config = getConfig();

        var initializeOnLoad = config.getBoolean("initializeOnLoad", false);
        if (initializeOnLoad) {
            initialize(null);
        }
    }

    @SuppressLint("MissingPermission")
    @SuppressWarnings("unused")
    @PluginMethod
    public void getBluetoothDevices(PluginCall call) {
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        var bondedDevices = bluetoothAdapter.getBondedDevices();

        var devicesArray = new JSArray();

        for (var device : bondedDevices) {
            var servicesUuids = device.getUuids();

            var uuidsArray = new JSArray();

            for (var uuid : servicesUuids) {
                uuidsArray.put(uuid.toString());
            }

            var deviceObject = new JSObject();
            devicesArray.put(deviceObject);

            deviceObject.put("address", device.getAddress());
            //deviceObject.put("alias", device.getAlias());
            deviceObject.put("name", device.getName());
            deviceObject.put("bondState", device.getBondState());
            deviceObject.put("type", device.getType());
            deviceObject.put("uuids", uuidsArray);
        }

        var data = new JSObject();
        data.put("devices", devicesArray);
        call.resolve(data);
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void getNetworkDevices(PluginCall call) {
        var action = call.getInt("action");
        var hasWifiSearchOption = call.hasOption("wifiSearchOption");
        if (hasWifiSearchOption) {
            var lookupCount = call.getInt("wifiSearchOption.lookupCount");
            var interval = call.getFloat("wifiSearchOption.interval");
            var wire = call.hasOption("wifiSearchOption.wire") ? call.getInt("wifiSearchOption.wire") : 3;
            BXLNetwork.setWifiSearchOption(lookupCount, interval, (byte) wire);
        }

        var printers = BXLNetwork.getNetworkPrinters(action);
        var printersIterator = printers.iterator();

        var devicesArray = new JSArray();

        while(printersIterator.hasNext()) {
            devicesArray.put(printersIterator.next().toString());
        }

        var data = new JSObject();
        data.put("devices", devicesArray);
        call.resolve(data);
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void getUsbDevices(PluginCall call) {
        var requestPermission = call.getBoolean("requestPermission");
        var usbDevices = BXLUsbDevice.refreshUsbDevicesList(getContext(), requestPermission);

        var devicesArray = new JSArray();

        try {
            for (var device : usbDevices) {
                var deviceObject = new JSObject();
                devicesArray.put(deviceObject);

                deviceObject.put("deviceName", device.getDeviceName());
                deviceObject.put("manufacturerName", device.getManufacturerName());
                deviceObject.put("productName", device.getProductName());
                //deviceObject.put("version", device.getVersion());
                deviceObject.put("serialNumber", device.getSerialNumber());
                deviceObject.put("deviceId", device.getDeviceId());
                deviceObject.put("vendorId", device.getVendorId());
                deviceObject.put("productId", device.getProductId());
                deviceObject.put("deviceClass", device.getDeviceClass());
                deviceObject.put("deviceSubclass", device.getDeviceSubclass());
                deviceObject.put("deviceProtocol", device.getDeviceProtocol());
            }
        } catch (SecurityException e) {
            call.reject(e.getMessage());
            return;
        }

        var data = new JSObject();
        data.put("devices", devicesArray);
        call.resolve(data);
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void isInitialized(PluginCall call) {
        var data = new JSObject();
        data.put("value", configLoader != null);
        call.resolve(data);
    }

    @SuppressWarnings("unused")
    @PluginMethod(returnType = PluginMethod.RETURN_NONE)
    public void initialize(PluginCall call) {
        if (configLoader != null) {
            return;
        }

        var context = getContext();
        configLoader = new BXLConfigLoader(context);

        try {
            configLoader.openFile();
        } catch (Exception e) {
            e.printStackTrace();

            configLoader.newFile();
        }
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void addEntry(PluginCall call) {
        var logicalName = call.getString("logicalName");
        var deviceCategory = call.getInt("deviceCategory");
        var productName = call.getString("productName");
        var deviceBus = call.getInt("deviceBus");
        var address = call.getString("address");
        var secure = call.getBoolean("secure", false);

        try {
            configLoader.addEntry(logicalName, deviceCategory, productName, deviceBus, address, secure);

            call.resolve();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();

            call.reject(e.getMessage());
        }
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void getAllEntries(PluginCall call) {
        try {
            var entriesArray = new JSArray();
            var entries = configLoader.getEntries();
            var entriesLength = entries.size();
            for (var i = 0; i < entriesLength; i++) {
                var entry = entries.get(i);

                var entryObject = new JSObject();
                entriesArray.put(i, entryObject);

                var propertiesObject = new JSObject();
                var props = (Iterator<JposEntry.Prop>) entry.getProps();

                while (props.hasNext()) {
                    var prop = props.next();
                    var propertyName = prop.getName();
                    var propertyValue = prop.getValue();
                    propertiesObject.put(propertyName, propertyValue);
                }

                entryObject.put("logicalName", entry.getLogicalName());
                entryObject.put("properties", propertiesObject);
            }

            var data = new JSObject();
            data.put("entries", entriesArray);
            call.resolve(data);

            return;
        } catch (Exception e) {
            e.printStackTrace();
        }

        call.reject("Cannot get Bixolon entries.");
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void getEntry(PluginCall call) {
        var logicalName = call.getString("logicalName");;

        var deviceCategory = configLoader.getDeviceCategory(logicalName);
        var productName = configLoader.getProductName(logicalName);
        var address = configLoader.getAddress(logicalName);
        var deviceBus = configLoader.getDeviceBus(logicalName);

        var data = new JSObject();
        data.put("deviceCategory", deviceCategory);
        data.put("productName", productName);
        data.put("address", address);
        data.put("deviceBus", deviceBus);
        call.resolve(data);
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void modifyEntry(PluginCall call) {
        var logicalName = call.getString("logicalName");
        var deviceBus = call.getInt("deviceBus");
        var address = call.getString("address");
        var modifySecure = call.hasOption("secure");
        var secure = call.getBoolean("secure", false);

        var success = configLoader.modifyEntry(logicalName, deviceBus, address, modifySecure, secure);

        var data = new JSObject();
        data.put("value", success);
        call.resolve(data);
    }

    @SuppressWarnings("unused")
    @PluginMethod(returnType = PluginMethod.RETURN_NONE)
    public void removeAllEntries(PluginCall call) {
        configLoader.removeAllEntries();
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void removeEntry(PluginCall call) {
        var logicalName = call.getString("logicalName");;

        var success = configLoader.removeEntry(logicalName);

        var data = new JSObject();
        data.put("value", success);
        call.resolve(data);
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void save(PluginCall call) {
        try {
            configLoader.saveFile();

            call.resolve();
        } catch (Exception e) {
            e.printStackTrace();

            call.reject(e.getMessage());
        }
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void createControl(PluginCall call) {
        var hashKey = UUID.randomUUID().toString();
        var deviceCategory = call.getInt("deviceCategory");

        var context = getContext();
        var control = BixolonJposUtils.createJposControl(deviceCategory, context);

        controlsMap.put(hashKey, control);

        var data = new JSObject();
        data.put("value", hashKey);
        call.resolve(data);
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void disposeControl(PluginCall call) {
        var hashKey = call.getString("hashKey");

        var hasControl = controlsMap.containsKey(hashKey);
        if (hasControl) {
            controlsMap.remove(hashKey);
        }

        var data = new JSObject();
        data.put("value", hasControl);
        call.resolve(data);
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void callControl(PluginCall call) {
        var hashKey = call.getString("hashKey");
        var control = controlsMap.get(hashKey);

        var methodName = call.getString("methodName");
        var args = call.getArray("args");

        var argsLength = args.length();
        var methodArgs = new Object[argsLength];
        var methodArgsClasses = new Class[argsLength];

        for (var i = 0; i < argsLength; i++) {
            var reflectionObject = ReflectUtils.reflectArgument(args.opt(i), valuesMap);

            methodArgs[i] = reflectionObject.value;
            methodArgsClasses[i] = reflectionObject.classType;
        }

        try {
            var method = control.getClass().getMethod(methodName, methodArgsClasses);
            var result = method.invoke(control, methodArgs);

            if (result == null) {
                call.resolve();

                return;
            }

            var data = new JSObject();
            data.put("value", ReflectUtils.sanitizeArray(result));
            call.resolve(data);
        } catch (NoSuchMethodException | IllegalAccessException e) {
            e.printStackTrace();

            call.reject(e.getMessage(), e.getClass().getName());
        } catch (InvocationTargetException e) {
            e.printStackTrace();

            var data = new JSObject();

            var targetException = e.getTargetException();
            if (targetException instanceof JposException jposException) {
                data.put("code", jposException.getErrorCode());
                data.put("extendedCode", jposException.getErrorCodeExtended());
            }

            call.reject(targetException.getMessage(), targetException.getClass().getName(), data);
        }
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void addControlListener(PluginCall call) {
        var hashKey = call.getString("hashKey");
        var control = controlsMap.get(hashKey);
        var eventName = call.getString("eventName");
        var eventProperties = call.getArray("eventProperties");
        var eventPropertiesLength = eventProperties.length();

        try {
            var listenerClass = Class.forName("jpos.events." + eventName + "Listener");
            var addListenerMethod = control.getClass().getMethod("add" + eventName + "Listener", listenerClass);

            InvocationHandler handler = (proxy, method, args) -> {
                if (!method.getName().endsWith("Occurred")) {
                    switch (method.getName()) {
                        case "equals": {
                            return proxy == args[0];
                        }
                        case "hashCode": {
                            return System.identityHashCode(this);
                        }
                        case "toString": {
                            return proxy.getClass().getName() + '@' + Integer.toHexString(proxy.hashCode());
                        }
                    }
                }

                var event = args[0];
                var eventClass = event.getClass();
                var valuesArray = new JSArray();

                var data = new JSObject();
                data.put("hashKey", hashKey);
                data.put("values", valuesArray);

                try {
                    for (var i = 0; i < eventPropertiesLength; i++) {
                        var getterMethod = eventClass.getMethod("get" + eventProperties.getString(i));
                        var value = getterMethod.invoke(event);
                        valuesArray.put(i, ReflectUtils.sanitizeArray(value));
                    }

                    notifyListeners("control" + eventName, data);
                } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
                    // Do nothing
                }

                return null;
            };

            //https://docs.oracle.com/javase/8/docs/technotes/guides/reflection/proxy.html
            var listener = Proxy.newProxyInstance(listenerClass.getClassLoader(), new Class[] { listenerClass }, handler);
            addListenerMethod.invoke(control, listener);

            controlsListenerMap.put(hashKey + ":" + eventName, listener);

            call.resolve();
        } catch (ClassNotFoundException | NoSuchMethodException | IllegalAccessException e) {
            e.printStackTrace();

            call.reject(e.getMessage(), e.getClass().getName());
        } catch (InvocationTargetException e) {
            e.printStackTrace();

            var targetException = e.getTargetException();

            call.reject(targetException.getMessage(), targetException.getClass().getName());
        }
    }

    @SuppressWarnings("unused")
    @PluginMethod
    public void removeControlListener(PluginCall call) {
        var hashKey = call.getString("hashKey");
        var control = controlsMap.get(hashKey);
        var eventName = call.getString("eventName");
        var listener = controlsListenerMap.get(hashKey + ":" + eventName);

        if (listener == null) {
            return;
        }

        try {
            var listenerClass = Class.forName("jpos.events." + eventName + "Listener");
            var removeListenerMethod = control.getClass().getMethod("remove" + eventName + "Listener", listenerClass);

            removeListenerMethod.invoke(control, listener);

            call.resolve();
        } catch (ClassNotFoundException | NoSuchMethodException | IllegalAccessException e) {
            e.printStackTrace();

            call.reject(e.getMessage(), e.getClass().getName());
        } catch (InvocationTargetException e) {
            e.printStackTrace();

            var targetException = e.getTargetException();

            call.reject(targetException.getMessage(), targetException.getClass().getName());
        }
    }


}
