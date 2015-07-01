'use strict';

angAuth.directive('driverRacesList', function () {
    return{
        restrict: 'EA',
        scope: {
            labelsArray: '='
        },
        template: '<a class="list-group-item " ng-repeat="race in labelsArray">' +
            '       <table  class="result-table" width="100%">' +
            '           <tr ><td>' +
            '               <div class="col-md-12">' +
            '                   <div class="col-md-1">{{race.round}}</div>' +
            '                   <div class="col-md-3"><b>{{race.raceName}}</b></div>' +
            '                   <div class="col-md-4">{{race.Results[0].Constructor.name}}</div>' +
            '                   <div class="col-md-2">{{race.Results[0].grid}}</div>' +
            '                   <div class="col-md-2">{{race.Results[0].position}}</div>' +
            '               </div>' +
            '           </td>' +
            '           </tr>' +
            '           </table>' +
            '     </a>',
        link:function(scope, element, attr){
        }

    }
});
