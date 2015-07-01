/**
 * Created by Ravi on 3/26/14.
 */
'use strict';

angAuth.factory('raceProviders', function ($q, $http, AppConstants, $resource) {

    return{

       getDrivers : function() {
           return $http({
               method: 'GET',
               url: AppConstants.ServerPath + '/2013driverStandings.json'
           });
       },
        getDirectiveRaceList : function() {
            return $resource(AppConstants.ServerPath + '/results.json');
        },
       getDriverDetails : function(id) {
            return $http({
                method: 'JSONP',
                url: AppConstants.appPath+'drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK'
            });
        },
        getLoginDetails : function() {
            return $http({
                method: 'GET',
                url: AppConstants.ServerPath+'/login.json'
            });
        },
        setUserDetails: function(userDetails){
            this.userDetails = userDetails;
        },
        getUserDetails: function(){
           return this.userDetails;
        }
    }
});