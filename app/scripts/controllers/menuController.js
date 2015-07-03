'use strict';

angAuth.controller('menuController', function ($scope, $location) {

    $scope.routeIs = function(path){
     if($location.path() === path){
         return true;
     }
    };
    var usrDetails = localStorage.getItem('userDetails') ? localStorage.getItem('userDetails') : localStorage.getItem('FBUserData');
    $scope.userDetails = angular.fromJson(usrDetails);
	
    $scope.FBlogout = function(){
          //Check the LoginStatus, if connected, then make to logout,
         //You may be thinking 'getLoginStatus' checking  may not be necessary, but is very much required,
        //because if the facebook is logout then calling the FB.logout is an error, and will throw error
        //So better check the status and logout the user.
            console.log('clicked on logout');
            FB.getLoginStatus(function(response) {
                if (response && response.status === 'connected') {
                    FB.logout(function(response) {
                        //Now clear the localStorage item, that was set when logged in.
                        localStorage.clear();
                        $scope.$apply($location.url('/login'));
                    });
                }
            });
        }
});
