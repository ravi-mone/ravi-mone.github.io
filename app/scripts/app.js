'use strict'; //This strict context prevents certain actions from being taken and throws more exceptions.

var angAuth = angular.module('angularAuthApp', [
    'ngResource', //ngResource module when querying and posting data to a REST API.
    'ngRoute',      //ngRoute to enable URL routing to your application
    //'ngTable',
    'ngFacebook',
    'angular-loading-bar',
    'uiSlider',
    'angular-carousel'

]);

angAuth.config(function ($routeProvider, $locationProvider, $facebookProvider) {
    $routeProvider.
        when('/login', {templateUrl: 'views/login.html', controller: 'loginController', login: true}).
        when('/explain', {templateUrl: 'views/explain.html'}).
        when('/home', {templateUrl: 'views/home.html', controller: 'homeController'}).
        when('/treeSearch', {templateUrl: 'views/tree.html', controller: 'treeController'}).
        when('/listUser/:id', {templateUrl: 'views/listuser.html', controller: 'listController'}).
        when('/queryInAng', {templateUrl: 'views/queryInang.html', controller: 'jqueryController'}).
        when('/demo', {templateUrl: 'views/demo.html', controller: 'demoController'}).
        when('/myLab', {templateUrl: 'views/lobby.html'}).
        when('/notfound', {templateUrl: 'views/pagenotfound.html'}).
        otherwise({redirectTo: '/login'});

    //FaceBook Integration
    $facebookProvider.setAppId('712808278831012');

});

angAuth.constant('AppConstants', {
    ServerPath: 'server',
    appPath: 'http://ergast.com/api/f1/2013/'
});


angAuth.run(function ($rootScope, $location, $facebook) {

    // Load the facebook SDK asynchronously, paste as is.
    (function () {
        // If we've already installed the SDK, we're done
        if (document.getElementById('facebook-jssdk')) {
            return;
        }

        // Get the first script element, which we'll use to find the parent node
        var firstScriptElement = document.getElementsByTagName('script')[0];

        // Create a new script element and set its id
        var facebookJS = document.createElement('script');
        facebookJS.id = 'facebook-jssdk';

        // Set the new script's source to the source of the Facebook JS SDK
        facebookJS.src = '//connect.facebook.net/en_US/all.js';

        // Insert the Facebook JS SDK into the DOM
        firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
    }());

    $rootScope.$on('$locationChangeStart', function () {
        if ((localStorage.getItem('FBUserData') === null) && ($location.path() !== '/login')) {
           // $location.url('/login');
        }
        if (angular.toJson(localStorage.getItem('userDetails')).username !== null) {
            if (($location.path() !== '/login') && (localStorage.getItem('validUser') === 'invalid')) {
                $location.url('/login');
            }
        } else {
           // $location.url('/login');
        }
    });
    $rootScope.$on('$locationChangeSuccess', function () {
        if ((localStorage.getItem('FBUserData') === null) && ($location.path() !== '/login')) {
            $facebook.getLoginStatus().then( //This is FB getLoginStatus api to check the user status.
                function (response) {

                    // If the user manfully enter the inside page, then redirect to login page.
                    if (($location.path() !== '/login')) {
                        if (response && response.status != 'connected') {
                            $location.url('/login');
                        }
                    } else if ($location.path() === '/login') {
                        // If the user is logged in to Facebook,
                        //then just refreshing the login page of this app, should place the user to home page

                        if (response && response.status === 'connected') {
                            $location.url('/home');
                        }
                    }
                },
                function (err) {
                    console.log(err);
                });
        }
    });
});
