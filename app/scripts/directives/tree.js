angAuth.directive("tree", function ($compile) {

    //Here is the Directive Definition Object being returned
    //which is one of the two options for creating a custom directive
    return {

        // this parameter specifies that this directive is created by element.
        // options are as follows
        // 'E' - only matches element name , 'A' - only matches attribute name , 'C' - only matches class name
        restrict: "E",

        //We are stating here the HTML in the element the directive is applied to is going to be given to
        //the template with a ng-transclude directive to be compiled when processing the directive
        transclude: true,

        // this option sets family variable for whichever child we are creating node
        scope: {
            family: '='
        },

        // this option creates template
        template: '<ul class="even">' +

            //Here we have one of the ng-transclude directive that will give the HTML in the
            //element the directive is applied to
            '<li  ng-transclude></li>' +

            // create all child nodes with ng-repeat directive
            '<ul  ng-repeat="child in family.children" class="odd">' +

            // creates inner nodes with ng-transclude directive
            '<tree family="child"><div ng-transclude></div></tree>' +

            '</ul>' +
            '</ul>',

        // compile function deals with transforming the template DOM.

        /*
        * @params
        * tElement : template element, meaning it contains all the HTML within our DOM  node,
        * tAttr :  $attrs object, that was passed to our linking function
        * linker : linker is the transcluded function, which Angular would normally
        * use to attach a scope to this element, interpolate all of the values, and then insert the
        * final object into the DOM.
        */
        compile: function (tElement, tAttr, linker) {

            //We are removing the contents/innerHTML from the element we are going to be applying the
            //directive to and saving it to adding it below to the $compile call as the template

            var contents = tElement.contents().remove();

            var compiledContents;


            return function (scope, iElement, iAttr) {

                // check if compiledContents are not available
                if (!compiledContents) {

                    //Get the link function with the contents frome top level template with
                    //the transclude
                    //console.log(contents);
                    compiledContents = $compile(contents, linker);
                    //console.log(compiledContents);
                }

                // returns main template and cloned templates
                compiledContents(scope, function (clone, scope) {

                    //Appending the cloned template to the instance element, "iElement",
                    //on which the directive is to used.
                    iElement.append(clone);
                });
            };
        }
    };
});