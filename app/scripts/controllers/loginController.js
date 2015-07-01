'use strict';
//https://developers.google.com/+/web/signin/javascript-flow

angAuth.controller('loginController', function ($scope, $location, $facebook, $rootScope, raceProviders, $timeout) {

    /*
    * Function called when the user clicks on the login button to login the application.
    * */
    $scope.FBlogin = function() {
        $facebook.login().then(function() {
            $facebook.api("/me").then(
                function(response) {
                    localStorage.setItem('FBUserData', angular.toJson(response));
                    $location.url('/home');
                },
                function(err) {
                    $scope.welcomeMsg = "Please log in";
                });
        });
    }
    var message = '';
    $scope.loginUser = function(credientials){
        raceProviders.getLoginDetails().then(function (response) {
            if(response.status == 200){
                var userCredentials = response.data;
                raceProviders.setUserDetails(userCredentials);
                if( (credientials.username === userCredentials.username) && (credientials.password === userCredentials.password)){
                    $scope.message = "Valid User!, please wait, will redirect in few seconds...";
                    $timeout(function(){
                        localStorage.setItem('userDetails', JSON.stringify(userCredentials));
                        $location.url('/home');
                    }, 2000);

                }else{
                    $scope.message = "User Credentials are invalid!";
                    localStorage.removeItem('userDetails');
                }
            }
        });
    };
});
