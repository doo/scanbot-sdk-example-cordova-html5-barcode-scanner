#!/bin/bash

cordova plugin rm cordova-plugin-scanbot-sdk
#cordova plugin add ~/work/projects/scanbot/scanbot-sdk-cordova-plugin
cordova plugin add cordova-plugin-scanbot-sdk@4.1.0-rc6

cordova prepare android
cordova platform ls
cordova plugin ls
