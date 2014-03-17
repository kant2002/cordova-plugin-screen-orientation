/*
 * Copyright 2013-2014 Andrey Kurduymov
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

/**
 * An interface representing a directory on the file system.
 *
 * {boolean} isFile always false (readonly)
 * {boolean} isDirectory always true (readonly)
 * {DOMString} name of the directory, excluding the path leading to it (readonly)
 * {DOMString} fullPath the absolute full path to the directory (readonly)
 * {FileSystem} filesystem on which the directory resides (readonly)
 */
var ScreenOrientation = function () {
    this.orientation = {};
    this.orientation.unspecified = "unspecified";
    this.orientation.landscape = "landscape";
    this.orientation.portrait = "portrait";
    this.orientation.user = "user";
    this.orientation.behind = "behind";
    this.orientation.sensor = "sensor";
    this.orientation.nosensor = "nosensor";
    this.orientation.sensorLandscape = "sensorLandscape";
    this.orientation.sensorPortrait = "sensorPortrait";
    this.orientation.reverseLandscape = "reverseLandscape";
    this.orientation.reversePortrait = "reversePortrait";
    this.orientation.fullSensor = "fullSensor";
};

/**
 * Set screen orientation.
 *
 * @param successCallback
 *            {Function} is called when orientation is changed successfully.
 * @param errorCallback
 *            {Function} is called with a orientation change was done with error.
 */
ScreenOrientation.prototype.setOrientation = function (orientation, successCallback, errorCallback) {
    argscheck.checkArgs('SFF', 'ScreenOrientation.setOrientation', arguments);
    var success = successCallback && function (lastModified) {
        console.log("Sucess call to setOrientation");
        //var metadata = new Metadata(lastModified);
        //successCallback(metadata);
    };
    var fail = errorCallback && function(code) {
        console.log("Error during call to setOrientation");
        //errorCallback(new FileError(code));
    };

    exec(success, fail, "ScreenOrientation", "setOrientation", [orientation]);
};

/**
 * Lock current screen orientation.
 */
ScreenOrientation.prototype.lock = function () {
    exec(success, fail, "ScreenOrientation", "lock", []);
};

module.exports = new ScreenOrientation();
