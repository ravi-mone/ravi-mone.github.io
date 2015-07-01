'use strict';

angAuth.directive('authHeader', function () {
    return{
        restrict:'AE',
        scope:{
            companyLogo : '@',
            companyName : '@',
            companyFlashText:'@'
        },
        templateUrl:'templates/hearder.html'
    }
});