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

#import "CDVScreenOrientation.h"
#import <Cordova/CDV.h>
#import <objc/message.h>

#define kSplashScreenDurationDefault 0.25f

@implementation CDVScreenOrientation

- (void)pluginInitialize
{
}

- (void)setOrientation:(CDVInvokedUrlCommand*)command
{
    NSString* orientationName = [command.arguments objectAtIndex:0];
    UIInterfaceOrientation orientation = [self getOrientation:orientationName];
    NSLog(@"Setting orientation %@", orientationName);
    [self updateOrientation:orientation];
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)lock:(CDVInvokedUrlCommand*)command
{
    UIInterfaceOrientation orientation = UIInterfaceOrientationLandscapeLeft;
    [self updateOrientation:orientation];
    
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (UIInterfaceOrientation)getOrientation:(NSString*)orientationName
{
    if ([orientationName isEqualToString:@"portrait"]) {
        return UIInterfaceOrientationPortrait;
    } else if ([orientationName isEqualToString:@"landscape"]) {
        return UIInterfaceOrientationLandscapeLeft;
    } else if ([orientationName isEqualToString:@"reverseLandscape"]) {
        return UIInterfaceOrientationLandscapeRight;
    } else if ([orientationName isEqualToString:@"reversePortrait"]) {
        return UIInterfaceOrientationPortraitUpsideDown;
    }
    
    return UIInterfaceOrientationPortrait;
}

- (void)updateOrientation:(UIInterfaceOrientation)orientation
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIDevice currentDevice] setValue:[NSNumber numberWithInteger: orientation] forKey:@"orientation"];
        [UIViewController attemptRotationToDeviceOrientation];
    });
}

@end
