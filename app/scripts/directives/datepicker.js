'use strict';
angAuth.directive("datepicker", function () {
    return {
        restrict: "A",
       // require: "ngModel",
        link: function (scope, elem, attrs) {
            var options = {
                dateFormat: "dd/mm/yy",
                // handle jquery date change
                onSelect: function (dateText) {
                    scope.$apply(function () {
                        //In order to set the view value of a scope,
                        // we must call the API function ngModel.$setViewValue().
                        scope.date = dateText;
                        //ngModelCtrl.$setViewValue(dateText);
                    });
                }
            };

            // jqueryfy the element
            elem.datepicker(options);
        }
    }
});
