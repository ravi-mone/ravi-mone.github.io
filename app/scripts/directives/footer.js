'use strict';

angAuth.directive('authFooter', function () {
    return{
        restrict:'AE',
        scope:{
            text : '@footerText'
        },
        template:'<div class="container">' +
            '<div class="footer jumbotron">' +
            '<p>{{text}}</p>' +
            '</div>' +
            '</div>'
    }
});