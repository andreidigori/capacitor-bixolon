package com.getcapacitor.community.bixolon.reflect;

public class ReflectionObject {
    public Object value;
    public Class classType;

    ReflectionObject(Object value, Class classType) {
        this.value = value;
        this.classType = classType;
    }
}
