package com.codecrafters.cache;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CacheModule extends ReactContextBaseJavaModule {
    private static final String CACHE_NAME = "CACHE";
    private final SharedPreferences prefs;

    public CacheModule(ReactApplicationContext context) {
        super(context);
        prefs = context.getSharedPreferences(CACHE_NAME, Context.MODE_PRIVATE);
    }

    @Override
    public String getName() {
        return "CacheModule";
    }

    @ReactMethod
    public void put(String key, String value) {
        prefs.edit().putString(key, value).apply();
    }

    @ReactMethod
    public void get(String key, Promise promise) {
        try {
            promise.resolve(prefs.getString(key, null));
        } catch (Exception e) {
            promise.reject("CACHE_ERROR", e);
        }
    }

    @ReactMethod
    public void remove(String key) {
        prefs.edit().remove(key).apply();
    }

    @ReactMethod
    public void clear() {
        prefs.edit().clear().apply();
    }
}
