'use strict';

angAuth.directive('authMenu', function () {
    return{
        restrict:'AE',
        scope:{
            text : '@footerText'
        },
        templateUrl:'templates/menubar.html'
    }
});