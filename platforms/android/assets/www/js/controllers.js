angular.module('MZap.controllers', ["ionic", "firebase"])

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $ionicPlatform, $timeout, $firebase, $firebaseSimpleLogin) {

    // create an AngularFire reference to the data
    var ref = new Firebase("https://intense-fire-73.firebaseio.com/");

    // Create a Firebase Simple Login object
    $scope.auth = $firebaseSimpleLogin(ref);
    // Initially set no user to be logged in
    $scope.user = null;

    // Form data for the login modal
    $scope.loginData = {};
    $scope.registerData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.register_modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.auth.$getCurrentUser().then(function(user) {
            if (user !== null) {
                $scope.modal.hide();
            }
        });
    },

    // Triggered in the login modal to close it
    $scope.closeRegister = function() {
        $scope.auth.$getCurrentUser().then(function(user) {
            if (user == null) {
                $scope.register_modal.hide();
                $scope.login();
            } else {
                $scope.register_modal.hide();
            }
        });
    },

    // Open the register modal
    $scope.register = function() {
        $scope.closeLogin();
        $scope.register_modal.show();
    };

    // Open the login modal and log an user in with the inputted provider
    $scope.login = function() { //(provider)
        //$scope.auth.$login(provider);
        $scope.modal.show();
        $scope.auth.$getCurrentUser().then(function(user) {
            if (!user == null) {
                $timeout(function(){
                    $scope.modal.hide();
                }, 2000);
            }
        });
    },

    // Logs a user out
    $scope.logout = function() {
        $scope.auth.$logout();
        $scope.closeLogin();
        try {
            window.cookies.clear(function() {
                console.log("Cookies cleared!");
            })
        } catch (e) {
            console.log('There was an error: ', e);
        }
        $scope.login();
    };

    //check if we are logged in else block access to the app and show the login screen
    //uncomment this when it is ready to work on an actual device
    // $ionicPlatform.ready(function() {
    //     if ($scope.user == null) {
    //         $scope.login();
    //     }
    // });
    //fake the above in the browser

    $timeout(function() {
        $scope.auth.$getCurrentUser().then(function(user) {
            if (user == null) {
                $scope.login();
            }
        });
    }, 500);


    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        $scope.auth.$login("password", {
            email: $scope.loginData.username,
            password: $scope.loginData.password
        });
    };

    // Perform the login action when the user submits the login form
    $scope.doRegister = function() {
        console.log('Doing register', $scope.registerData);

        $scope.auth.$createUser($scope.registerData.email, $scope.registerData.password)
            .then(function(user, provider) {
                console.log("Logged in as: ", user.uid, user);
                $scope.auth.$login("password", {
                    email: $scope.registerData.email,
                    password: $scope.registerData.password
                }).then(function(user) {
                    console.log("Logged in as: ", user.uid);
                }, function(error) {
                    console.error("Login failed: ", error);
                });
            }, function(error) {
                console.error("Login failed: ", error);
            });
    };

    // Upon successful login, set the user object
    $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
        $scope.user = user;
        console.log("User " + user.id + " successfully logged in!");
    });
    // Upon successful logout, reset the user object
    $rootScope.$on("$firebaseSimpleLogin:logout", function(event) {
        $scope.user = null;
    });
    // Log any login-related errors to the console
    $rootScope.$on("$firebaseSimpleLogin:error", function(event, error) {
        console.log("Error logging user in: ", error);
    });
})

.controller('ScriptsCtrl', function($scope, $timeout, $firebase, $hideSearch) {
    var ref = new Firebase("https://intense-fire-73.firebaseio.com/listings/");
    var sync = $firebase(ref);

    // create a synchronized object, all server changes are downloaded in realtime
    $scope.listings = sync.$asObject();
    console.log("Listings: ", $scope.listings)

    $scope.cancelSearch = function() {
        $hideSearch.cancelSearch();
    }

    // $timeout(function() {
    //    $scope.cancelSearch(); 
    // });
})

.controller('ScriptDetails', function($scope, $stateParams, $firebase, $ionicNavBarDelegate, $ionicPopup) {

    var ref = new Firebase("https://intense-fire-73.firebaseio.com/listings/results/" + $stateParams.scriptId);
    var sync = $firebase(ref);

    // create a synchronized object, all server changes are downloaded in realtime
    $scope.script = sync.$asObject();
    console.log("Script Details obj: ", $scope.script);

    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };

    // An alert dialog
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Email Sent!',
            template: 'The email has been sent.'
        });
        alertPopup.then(function(res) {
            $scope.goBack();
        });
    };
    
    
})

.controller('ContactsCtrl', function($scope, $stateParams, $timeout, $ionicScrollDelegate, $firebase, $hideSearch, $ionicModal) {

    var ref = new Firebase("https://intense-fire-73.firebaseio.com/contacts/");
    var sync = $firebase(ref);

    // create a synchronized object, all server changes are downloaded in realtime
    $scope.contacts = sync.$asObject();
    console.log("Contacts: ", $scope.contacts)

    $scope.cancelSearch = function() {
        $hideSearch.cancelSearch();
    }

    $scope.randomColor = function() {
        var colors = [
          "204,204,204,1", //rgba
          "170,0,0,1",
          "255,119,34,1",
          "255,163,21,1",
          "109,200,74,1",
          "51,153,51,1"
        ],
        color = colors[Math.floor(Math.random() * colors.length)];
        //color = colors[1];
        return color;
    }

    // $timeout(function(){
    //     $scope.cancelSearch();
    // }, 2000);

    //Quick Add methods
    // Form data for the login modal
    $scope.quickAddData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/quick_add.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.quickModal = modal;
    });

    // Save quick add info
    $scope.closeQuickAdd = function() {
        $scope.quickModal.hide();
    },

    // Triggered in the login modal to close it
    $scope.closeQuickAdd = function() {
        $scope.quickModal.hide();
    },

    // Open the register modal
    $scope.quickAdd = function() {
        $scope.quickModal.show();
        //$ionicScrollDelegate.scrollTo(0, 0, false);
    },

    // Perform the login action when the user submits the login form
    $scope.doQuickAdd = function() {
        console.log('Quick add info', $scope.quickAddData);

        var quickDataObj = $scope.quickAddData,
            today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth()+1; //January is 0,
            yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 

        today = mm+'/'+dd+'/'+yyyy;

        quickDataObj.clientName = $scope.quickAddData.name + " " + $scope.quickAddData.surname;
        quickDataObj.isNew = 1;
        quickDataObj.clientLastPersonalContact = today;
        quickDataObj.clientScore = Math.floor(Math.random() * 99) + 1

        var ref = new Firebase("https://intense-fire-73.firebaseio.com/contacts/list/");
        var sync = $firebase(ref);
        
        // add a new child node
        sync.$push($scope.quickAddData).then(function(newChildRef) {
          console.log("added record with id " + newChildRef.name());
          console.log("added" + newChildRef);
        });
        // // create a synchronized object, all server changes are downloaded in realtime
        // var contactsObject = sync.$asObject();
    
        // // add an email address to the profile
        // contactsObject.name = $scope.quickAddData.name;
        // contactsObject.surname = $scope.quickAddData.surname;
        // contactsObject.email = $scope.quickAddData.email;
        // // save the changes to Firebase
        // contactsObject.$push(contactsObject);

        // $scope.auth.$login("password", {
        //     email: $scope.loginData.username,
        //     password: $scope.loginData.password
        // });
    };
    
})

.controller('ContactDetails', function($scope, $rootScope, $stateParams, $firebase) {

    var ref = new Firebase("https://intense-fire-73.firebaseio.com/contacts/list/" + $stateParams.contactId);
    var sync = $firebase(ref);

    // create a synchronized object, all server changes are downloaded in realtime
    $scope.contact = sync.$asObject();
    console.log("Contact Details obj: ", $scope.contact);
    
    $scope.randomColor = function(){
        var colors = [
          "204,204,204,1", //rgba
          "170,0,0,1",
          "255,119,34,1",
          "255,163,21,1",
          "109,200,74,1",
          "51,153,51,1"
        ],
        color = colors[Math.floor(Math.random() * colors.length)];
        return color;
    }
    
})

.factory('$hideSearch', function($ionicScrollDelegate) {
    return {
        cancelSearch: function() {
            $ionicScrollDelegate.scrollTo(0, 64, true);
        }
    };
})