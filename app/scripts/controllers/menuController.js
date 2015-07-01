'use strict';

angAuth.controller('menuController', function ($scope, $location) {

    $scope.routeIs = function(path){
     if($location.path() === path){
         return true;
     }
    };
    $scope.userDetails = angular.fromJson(localStorage.getItem('userDetails'));
    $scope.FBlogout = function(){
        localStorage.removeItem('userDetails');
        $location.url('/login');
    };
});
