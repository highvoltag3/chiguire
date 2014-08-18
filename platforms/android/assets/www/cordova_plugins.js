cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.bez4pieci.cookies/www/cookies.js",
        "id": "com.bez4pieci.cookies.cookies",
        "clobbers": [
            "cookies"
        ]
    },
    {
        "file": "plugins/com.ionic.keyboard/www/keyboard.js",
        "id": "com.ionic.keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ]
    },
    {
        "file": "plugins/com.urbanairship.phonegap.PushNotification/www/PushNotification.js",
        "id": "com.urbanairship.phonegap.PushNotification.PushNotification",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.bez4pieci.cookies": "0.0.1",
    "com.ionic.keyboard": "1.0.2",
    "com.urbanairship.phonegap.PushNotification": "2.4.0",
    "org.apache.cordova.console": "0.2.9",
    "org.apache.cordova.device": "0.2.10"
}
// BOTTOM OF METADATA
});