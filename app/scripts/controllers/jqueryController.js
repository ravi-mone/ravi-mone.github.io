angAuth.controller('jqueryController', function($scope, $filter, $http, AppConstants){
    //Default set the date to particular format
    $scope.date = $filter('date')(new Date(), 'dd/MM/yyyy');

    $http.get(AppConstants.ServerPath+'/select.json').success(function (data) {
        $scope.recipients = data;
    }).error(function (e) {

    });
});