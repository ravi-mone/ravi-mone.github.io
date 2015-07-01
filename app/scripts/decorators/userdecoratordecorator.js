'use strict';

angular.module('angularAuthApp')
    .config(function ($provide) {
        $provide.decorator('userdecorator', function ($delegate) {
            // decorate the $delegate
            return $delegate;
        });
    });
