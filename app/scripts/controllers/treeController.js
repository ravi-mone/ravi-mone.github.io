'use strict';
angAuth.controller('treeController', function ($scope, $compile, $http, AppConstants, $interpolate, $parse) {

    // variable to print errors and messages
    $scope.pathPrint = "";

    // variable to store found path
    var path = "";

    // variable used to get check if node found
    var nodeFound = false;

    // recursive search function which uses depth first search algorithm
    function depthFirstSearch(childName, childObj) {

        // if node name found
        if (childName == childObj.name) {
            nodeFound = true;

            // prepend name to path
            path = childObj.name + path;

            // return array which contains node name , found flag and path
            return new Array(childObj.name, nodeFound, path);

            // else part if node name is not found
        } else {

            // go through all childrens of node
            for (var child in childObj.children) {

                // recursive search of child of children
                var ParentNode = depthFirstSearch(childName, childObj.children[child]);

                // this if condition checks if node found which is one variable of recursive function output array
                if (ParentNode[1]) {

                    // prepend node name to path
                    path = childObj.name + "/" + path;

                    // change status of variable to true
                    nodeFound = true;

                }

                // check if node found if yes break for loop
                if (nodeFound) {
                    break;
                }
            }

            // return name , flag and path in form of array
            return new Array(childObj.name, nodeFound, path);
        }
    }

    // This is function which is called after clicking on "Get Path" button
    // childname is the argument which is actual value of search text box
    $scope.searchChild = function (childName) {

        // initialise path and nodeFound so that everytime you click on get path button it removes values if stored any
        path = "";
        nodeFound = false;

        // this recursive function gives final path where complete tree and node name is sent as arguments
        var finalPath = depthFirstSearch(childName, $scope.treeFamily);

        // clear all highlighted nodes for new search
        var myEl = angular.element(".backcolored");
        myEl.removeClass("backcolored").addClass("back");

        // check if path is found or not
        if (finalPath[2]) {

            // assign final path to variable which will be displayed in front of user
            $scope.pathPrint = "PATH : " + finalPath[2];

            // assign color in which message will be displayed
            $scope.color = "green";

            // create array of node id's and highlight nodes according to path
            var idArray = finalPath[2].split("/");
            angular.forEach(idArray, function (todo) {
                var myEl = angular.element(document.querySelector("#" + todo));
                myEl.removeClass("back").addClass("backcolored");
            });

            // else part path not found
        } else {

            // assign messge to pathPrint variable which is displayed in red color
            $scope.pathPrint = 'No path found';
            $scope.color = "red";

        }
    }

    // This function is called when we click on "Build Tree" button
    $scope.buildTree = function () {

        // this is ajax request which takes JSON file as parameter

        $http.get(AppConstants.ServerPath+'/tree.json', {

            // this function checks JSON format before sending data to application
            // and then passes valid JSON to application , else throws error that
            // JSON format is invalid
            transformResponse: function (data, headersGetter) {
                try {
                    var jsonObject = JSON.parse(data);
                    return jsonObject;
                } catch (e) {
                    $scope.pathPrint = 'JSON format invalid';
                    $scope.color = "red";
                }
                return "";
            }

            // this success function creates tree from JSON Data which we get from above transformResponse function
        }).success(function (data) {

            // make this data global for controller
            $scope.treeFamily = data;

            // check if data is present as a result of successful ajax request and parsing of valid JSON
            if ($scope.treeFamily != "") {

                // clear any messages displayed
                $scope.pathPrint = '';

                // create tree using directive of angularjs and display it
                $("#treeDiv").html($compile('<tree family="treeFamily"> <p class="button back" id="{{ family.name }}">{{ family.name }}</p></tree>')($scope));
                // after building tree show search text box and "Get Path" button
                $("#btnDiv").html($compile('<input ng-model="childName"><button ng-click="searchChild(childName)" id="btn-action">Get Path</button>')($scope));
            }


            //$("#btnDiv").append('<div />').html($interpolate(imgHtml)($scope));
            // this function is called when ajax request is not successful
            // (reason may be if web server is not used to check application in chrome or
            // json filename is wrong or not present in particular path)
        }).error(function (e) {

            // display error message in red
            $scope.pathPrint = 'Unable to send Ajax request..Try one of the following  - Please use web server to execute this file in chrome or - Please check proper json filename and path';
            $scope.color = "red";


        });


    }
});