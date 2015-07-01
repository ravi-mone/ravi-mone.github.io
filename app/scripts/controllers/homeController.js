'use strict';

angAuth.controller('homeController', function ($scope, raceProviders) {
    $scope.driversList=[];
    var data;
    raceProviders.getDrivers().then(function (response) {
        //Dig into the responde to get the relevant data
        if(response.status == 200){
            $scope.driversList = response.data[0].MRData.StandingsTable.StandingsLists[0].DriverStandings;
            data = $scope.driversList;
            $scope.data = data;

        }else{
            $scope.driversList = {error: 'Error Could not read the Json'};
        }
        $scope.pageSelected = data.length;
    });


    //Function called for slider, observe the position object and filter the drivers accordingly.
    $scope.sliderFilter={
        position:{
            from:1,
            to:23,
            floor:1,
            ceil:23
        },
        points:{
            from:0,
            to:400,
            floor:0,
            ceil:400
        },
        wins:{
            from:0,
            to:13,
            floor:0,
            ceil:13
        },
        selectedFilter:'position'
    };

    $scope.makeActive = function(selectedFilter){
        if($('span.glyphicon-filter').hasClass('filteractive')){
            $('span.filteractive').removeClass('filteractive');
            $('span'+'#'+selectedFilter).addClass('filteractive');
        }
        $scope.sliderFilter.selectedFilter = selectedFilter;
    };

    $scope.$watch('sliderFilter', function(){
        $scope.data = $scope.driversList.filter(function(driver){
            if(parseInt(driver[$scope.sliderFilter.selectedFilter]) >= parseInt($scope.sliderFilter[$scope.sliderFilter.selectedFilter].from)
                && parseInt(driver[$scope.sliderFilter.selectedFilter]) <= parseInt($scope.sliderFilter[$scope.sliderFilter.selectedFilter].to)){
                return driver;
            }
        });
    }, true);


    //Function called when the user clicks on the search button.
    function filterObj(obj, key) {
        var driverName = key;
        if (driverName.indexOf($scope.nameFilter) !== -1) {
            //make parseInt so as to apply orderBy filter on 'points', 'position' and 'wins' column
            obj.points = parseInt(obj.points);
            obj.position = parseInt(obj.position);
            obj.wins = parseInt(obj.wins);
            return obj;
        }
    }

    $scope.filterByNames = function() {
        data = $scope.driversList;
        $scope.pageSelected=data.length;

        /*The filter() method creates a new array with all elements that pass the test implemented by the provided function.
         * refer: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
         * */
        $scope.data = data.filter(function(Obj){

            return filterObj(Obj, Obj.Driver.givenName);
        });
    };

    //Function called when the user selects the "Show x Records" list.
    $scope.showSelected = function(pageSelected) {
        if (pageSelected) {
            $scope.pageSelected = pageSelected;
        }else{
            $scope.pageSelected = $scope.data.length;
        }
    };

    //This function is required to sort the columns having number values like 'points', 'position' and 'wins' column
    var filter = { };
    $scope.sortBy = function(key) {

        if (filter.sortAsc) {
            if(key == 'Driver.familyName'){
                $scope.data = $scope.data.sort();
            }else {
                $scope.data = $scope.data.sort(function (firstObj, nextObj) {
                    return parseInt(firstObj[filter.sortBy]) - parseInt(nextObj[filter.sortBy]);
                });
            }
            filter.sortAsc = !filter.sortAsc;
        } else {
            //$scope.orderIt = '-'+key;
            $scope.data = $scope.data.reverse();
            filter.sortBy = key;
            filter.sortAsc = true;
        }
    };

    //Function called when the user clicks on the sort columns to show the up/down arrows
    $scope.sortIconFor = function(key) {
        if (filter.sortBy !== key) {
            return '';
        }
        if(filter.sortAsc){
            return '\u25B2';
        } else{
            return '\u25BC';
        }
    };
});
angAuth.directive('modifySlider', function ($parse) {
    return{
        restrict:'E',
        transclude : true,
        replace :true,
        template: '<div ng-transclude></div>',
        link: function(scope, tElement, tAttrs){

        }
    }
});