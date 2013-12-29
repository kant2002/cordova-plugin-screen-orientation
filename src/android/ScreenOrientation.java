/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at


         http://www.apache.org/licenses/LICENSE-2.0


       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/
package org.apache.cordova.screenorientation;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.content.pm.ActivityInfo;

public class ScreenOrientation extends CordovaPlugin  {
    private static final String UNSPECIFIED = "unspecified";
    private static final String LANDSCAPE = "landscape";
    private static final String PORTRAIT = "portrait";
    private static final String USER = "user";
    private static final String BEHIND = "behind";
    private static final String SENSOR = "sensor";
    private static final String NOSENSOR = "nosensor";
    private static final String SENSOR_LANDSCAPE = "sensorLandscape";
    private static final String SENSOR_PORTRAIT = "sensorPortrait";
    private static final String REVERSE_LANDSCAPE = "reverseLandscape";
    private static final String REVERSE_PORTRAIT = "reversePortrait";
    private static final String FULL_SENSOR = "fullSensor";

    /**
     * Executes the request and returns whether the action was valid.
     *
     * @param action                 The action to execute.
     * @param args                 JSONArray of arguments for the plugin.
     * @param callbackContext        The callback context used when calling back into JavaScript.
     * @return                         True if the action was valid, false otherwise.
     */
    public boolean execute(String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {
        if (action.equals("setOrientation")) {
            String orientation = args.optString(0);
            
            Activity activity = this.cordova.getActivity();
            if (orientation.equals(UNSPECIFIED)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
            } else if (orientation.equals(LANDSCAPE)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
            } else if (orientation.equals(PORTRAIT)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
            } else if (orientation.equals(USER)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_USER);
            } else if (orientation.equals(BEHIND)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_BEHIND);
            } else if (orientation.equals(SENSOR)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);
            } else if (orientation.equals(NOSENSOR)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_NOSENSOR);
            } else if (orientation.equals(SENSOR_LANDSCAPE)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
            } else if (orientation.equals(SENSOR_PORTRAIT)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT);
            } else if (orientation.equals(REVERSE_LANDSCAPE)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE);
            } else if (orientation.equals(REVERSE_PORTRAIT)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT);
            } else if (orientation.equals(FULL_SENSOR)) {
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR);
            }
            
            callbackContext.success();
            return true;
        } else {
            return false;
        }
    }
}
