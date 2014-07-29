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
    this.lockOrientation = true;
    this.currentOrientation = "portrait";
    this.logging = false;
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
    var self = this;
    argscheck.checkArgs('SFF', 'ScreenOrientation.setOrientation', arguments);
    this.currentOrientation = orientation;
    var oldLockOrientation = this.lockOrientation;
    var success = function (lastModified) {
        if (self.logging) {
            console.log("Sucess call to setOrientation");
        }

        setTimeout(function(){
            if (self.logging) {
                console.log("Success call to setOrientation(" + orientation + ") - set orientationlock back to " + oldLockOrientation);
            }

            self.lockOrientation = oldLockOrientation;
        }, 100);
        //successCallback(metadata);
    };
    var fail = errorCallback && function(code) {
        self.lockOrientation = oldLockOrientation;
        console.error("Error during call to setOrientation");
        //errorCallback(new FileError(code));
    };

    self.lockOrientation = false;
    exec(success, fail, "ScreenOrientation", "setOrientation", [orientation]);
};

/**
 * Lock current screen orientation.
 */
ScreenOrientation.prototype.lock = function (successCallback, errorCallback) {
    this.lockOrientation = true;
    var success = successCallback && function (code) {
        //successCallback(metadata);
    };
    var fail = errorCallback && function(code) {
        //errorCallback(code);
    };
    exec(success, fail, "ScreenOrientation", "lock", []);
};

/**
 * Unlock current screen orientation.
 */
ScreenOrientation.prototype.unlock = function (successCallback, errorCallback) {
    this.lockOrientation = false;
    var success = successCallback && function (code) {
        //successCallback(metadata);
    };
    var fail = errorCallback && function(code) {
        //errorCallback(code);
    };
    exec(success, fail, "ScreenOrientation", "unlock", []);
};

ScreenOrientation.prototype.shouldRotateToOrientation = function(interfaceOrientation) {
    var result = !this.lockOrientation;
    if (this.currentOrientation == "portrait") {
        result = (interfaceOrientation == 0) || (interfaceOrientation == 180);
    }
    
    if (this.currentOrientation == "landscape") {
        result = (interfaceOrientation == 90) || (interfaceOrientation == -90);
    }
    
    if (this.logging) {
        console.log("shouldRotateToOrientation(" + interfaceOrientation + ") = " + result);
    }

    return result;
}

module.exports = new ScreenOrientation();
