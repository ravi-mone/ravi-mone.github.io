
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
        when('/login', { templateUrl: 'views/login.html', controller: 'loginController', login: true}).
        when('/explain', { templateUrl: 'views/explain.html'}).
        when('/home', { templateUrl: 'views/home.html', controller: 'homeController'}).
        when('/treeSearch', {templateUrl:'views/tree.html', controller:'treeController'}).
        when('/listUser/:id', {templateUrl:'views/listuser.html', controller: 'listController'}).
        when('/queryInAng', {templateUrl:'views/queryInang.html', controller: 'jqueryController'}).
        when('/demo', {templateUrl:'views/demo.html', controller: 'demoController'}).
        when('/myLab', {templateUrl:'views/lobby.html'}).
        when('/notfound', {templateUrl:'views/pagenotfound.html'}).
        otherwise({redirectTo: '/login'});

});

angAuth.constant('AppConstants', {
    ServerPath: 'server',
    appPath:'http://ergast.com/api/f1/2013/'
});


angAuth.run(function($rootScope, $location, $facebook){
    $rootScope.$on('$locationChangeStart', function () {
       if(angular.toJson(localStorage.getItem('userDetails')).username !== null) {
           if (($location.path() !== '/login') && (localStorage.getItem('validUser') === 'invalid')) {
               $location.url('/login');
           }
       }else{
           $location.url('/login');
       }
    });
});
