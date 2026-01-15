package com.codecrafters.cache;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CacheWithTTLModule extends ReactContextBaseJavaModule {
    private static final String CACHE_NAME = "CACHE_TTL";
    private static final String EXP_SUFFIX = "_expires_at";
    private final SharedPreferences prefs;

    public CacheWithTTLModule(ReactApplicationContext context) {
        super(context);
        prefs = context.getSharedPreferences(CACHE_NAME, Context.MODE_PRIVATE);
    }

    @Override
    public String getName() {
        return "CacheWithTTLModule";
    }

    @ReactMethod
    public void put(String key, String value, double ttlMillis) {
        long expiresAt = System.currentTimeMillis() + (long) ttlMillis;
        prefs.edit().putString(key, value).putLong(key + EXP_SUFFIX, expiresAt).apply();
    }

    @ReactMethod
    public void get(String key, Promise promise) {
        try {
            long expiresAt = prefs.getLong(key + EXP_SUFFIX, -1);
            if (expiresAt != -1 && System.currentTimeMillis() > expiresAt) {
                prefs.edit().remove(key).remove(key + EXP_SUFFIX).apply();
                promise.resolve(null);
                return;
            }
            promise.resolve(prefs.getString(key, null));
        } catch (Exception e) {
            promise.reject("CACHE_TTL_ERROR", e);
        }
    }

    @ReactMethod
    public void remove(String key) {
        prefs.edit().remove(key).remove(key + EXP_SUFFIX).apply();
    }

    @ReactMethod
    public void clear() {
        prefs.edit().clear().apply();
    }
}
