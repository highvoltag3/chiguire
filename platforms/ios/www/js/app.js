// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('MZap', ['ionic', 'MZap.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        // Callback for when a device has registered with Urban Airship.
        PushNotification.registerEvent('registration', function(error, id) {
            if (error) {
                console.log('there was an error registering for push notifications');
            } else {
                console.log("Registered with ID: " + id);
            }
        })

        // Register for any urban airship events
        document.addEventListener("urbanairship.registration", function(event) {
            if (event.error) {
                console.log('there was an error registering for push notifications');
            } else {
                console.log("Registered with ID: " + event.pushID);
            }
        }, false)

        document.addEventListener("urbanairship.push", function(event) {
            console.log("Incoming push: " + event.message)
        }, false)

        // Set tags on a device that you can push to
        // http://docs.urbanairship.com/connect/connect_audience.html#tags
        // PushNotification.setTags(["loves_cats", "shops_for_games"], function() {
        //     PushNotification.getTags(function(obj) {
        //         obj.tags.forEach(function(tag) {
        //             console.log("Tag: " + tag);
        //         });
        //     });
        // });

        // Set an alias; lets you tie a device to a user in your system
        // http://docs.urbanairship.com/connect/connect_audience.html#aliases
        // PushNotification.setAlias("awesomeuser22", function() {
        //     push.getAlias(function(alias) {
        //         console.log("The user formerly known as " + alias)
        //     });
        // });

        // Check if push is enabled
        PushNotification.isPushEnabled(function(enabled) {
            if (enabled) {
                console.log("Push is enabled! Fire away!");
            }
        })
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    // .state('app.search', {
    //     url: "/search",
    //     views: {
    //         'menuContent': {
    //             templateUrl: "templates/search.html"
    //         }
    //     }
    // })

    .state('app.contacts', {
        url: "/contacts",
        views: {
            'menuContent': {
                templateUrl: "templates/browse.html",
                controller: 'ContactsCtrl'
            }
        }
    })
        .state('app.scripts', {
            url: "/scripts",
            views: {
                'menuContent': {
                    templateUrl: "templates/scripts.html",
                    controller: 'ScriptsCtrl'
                }
            }
        })

    .state('app.script', {
        url: "/script/:scriptId",
        views: {
            'menuContent': {
                templateUrl: "templates/script.html",
                controller: 'ScriptDetails'
            }
        }
    })

    .state('app.contact', {
        url: "/contact/:contactId",
        views: {
            'menuContent': {
                templateUrl: "templates/contact.html",
                controller: 'ContactDetails'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/scripts');
});