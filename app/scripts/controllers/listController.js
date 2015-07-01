'use strict';

angAuth.controller('listController', function ($scope, $routeParams, $http, AppConstants) {

        localStorage.setItem("position", localStorage.getItem("page"));
        localStorage.removeItem("page");

    $http.get(AppConstants.ServerPath+'/results.json').success(function(response){
        if(response[$routeParams.id]) {
            $scope.races = response[$routeParams.id].RaceTable.Races;
            $scope.driver = $scope.races[0].Results[0];
        }else{
            //For others load default
            $scope.races = response["vettel"].RaceTable.Races;
            $scope.driver = $scope.races[0].Results[0];
        }
    });
});
