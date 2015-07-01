'use strict';

angAuth.filter('customFunUpper', function($filter){
    return function(value){
        var input = $filter('lowercase')(value);
       return input[0].toUpperCase() + input.slice( 1 );
    }
});