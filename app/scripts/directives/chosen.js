'use strict';

angAuth.directive('chosen', function () {
    return{
        restrict:'EA',
        link:  function(scope, element, attr){
            scope.$watch('recipients', function(){
                element.trigger('chosen:updated');//
            });
            element.chosen();
        }
    }
});


angAuth.directive('ngAccordion', function () {
    return{
        restrict:'EA',
        link:  function(scope, element, attr){
            scope.$apply(function(){
                $( "#accordion" ).accordion({ heightStyle: "content"  })
            });
        }
    }
});


angAuth.directive('ngFbExplained', function ($sce) {
    return{
        restrict:'EA',
        controller:function($scope){
            //$scope.stepOne =
            this.stepOne = function(){

                return $sce.trustAsHtml('<ul><li>Download the zip file,' +
                    '<a href="https://github.com/GoDisco/ngFacebook/archive/master.zip" >Download here</a><br />' +
                    '    or use bower <code>bower install ng-facebook</code>, from your app directory' +
                    '<br /><br /><img src="images/cmd.png" border="0" onclick="alert(1)" /><br />' +
                    '</li>' +
                    '<li>Include the file in the index.html file, like:<br /><code>' +
                    '&lt;script src="bower_components/ng-facebook/ngFacebook.js"&gt;&lt;/script&gt;</code>' +
                    ' </li>' +
                    '</ul>');
            }
            this.stepTwo = function(){
                return $sce.trustAsHtml('<ul>' +
                    '                    <li>' +
                    '                        <code>' +
                    '                        var angAuth = angular.module("angularAuthApp", ["ngFacebook"]);' +
                    '                        </code>' +
                    '                   And try registering your application in <br />' +
                    '                        <a href="http://www.facebook.com/developers/" target="_blank">http://www.facebook.com/developers/</a><br />' +
                    '                        <a href="https://developers.facebook.com/docs/web/tutorials/scrumptious/register-facebook-application/" target="_blank">' +
                    'Refer This link,' +
                    '                        </a> for details. <br />' +
                    '                    And in the <code>angAuth.run()</code> function, initialize the API key,' +
                    '                        <code>$facebookProvider.setAppId("xxxxxxxxxx");</code>' +
                    '                    </li>' +
                    '                    </ul>');
            }
            this.stepThree = function(){
                return $sce.trustAsHtml('<h1>Step One</h1>');
            }

        },
        link:  function(scope, element, attr){
        }
    }
});

angAuth.directive('ngfbSteps', function () {
    return{
        restrict:'E',
        scope:{
            step:'@step'
        },
        require:'^ngFbExplained',
        template:'<div ng-bind-html="htmlSteps"></div>',
        link:function(scope, element, attr, ngFbExplainedCtrl){
            scope.htmlSteps = ngFbExplainedCtrl[scope.step]();
        }
    }
});

angAuth.directive('ngfbTemplate', function ($parse) {
    return{
        restrict:'E',
            scope:{
            fileFetch:'@filePath'
        },
        templateUrl: function(tElement, tAttrs){
            return tAttrs.filepath;
        }

    }
});

