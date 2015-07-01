angAuth.controller('demoController', function($scope, $http, $timeout, $filter, AppConstants){
    //Call the Ajax functionlity to load the external json file
    $http.get(AppConstants.ServerPath+'/data.json', {
    transformResponse:
        function(data) {
            $scope.carosal = {
                data:JSON.parse(data),
                selCIndex:0
            };
        }
    });

    //Function called when the user clicks on a carosal
    $scope.showDetails = function(index){
        $scope.carosal.selCIndex = index;
        document.getElementById('title').value = $scope.carosal.data[index]['title'];
        document.getElementById('description').value = $filter('showThreeWords')($scope.carosal.data[index]['description']);
    };

    $timeout(function() {
        //Show the default values onload of the pages
        $scope.showDefault = function (){
            $scope.carosal.selCIndex = 0;
            $scope.carosal.title = $scope.carosal.data[0].title;
            $scope.carosal.description = $filter('showThreeWords')($scope.carosal.data[0]['description']);
        };
        $scope.showDefault();
    }, 1000);

    //Function called when the user clicks on the uodate button
    $scope.updateCarosal = function( updatedObj){
        $scope.carosal.data[updatedObj.selCIndex].title = document.getElementById('title').value;
        $scope.carosal.data[updatedObj.selCIndex].description = $filter('showThreeWords')(document.getElementById('description').value);
    };

   // Functions related to Carousel module.
    function addSlide(target, style) {
        var i = target.length;
        target.push({
            img: 'asstes/images/carousel/image_'+i+'.png'
        });
    };

    function addSlides(target, style, qty) {
        for (var i=0; i < qty; i++) {
            addSlide(target, style);
        }
    }

    // 2nd ngRepeat demo
    $scope.slides2 = [];
    $scope.slideIndex = 0;  //Show first image as the default Selected image.
    addSlides($scope.slides2, 'img', 4);
    $scope.prev = function() {
        $scope.slideIndex--;
        $scope.showDetails($scope.slideIndex);
    };
    $scope.next = function() {
        $scope.slideIndex++;
        $scope.showDetails($scope.slideIndex);
    };

    $scope.slideIndex2 = 0;

})
.filter('showThreeWords', function () { //This is the filter used to filter the description to the specific length
    return function (value, slen) {
        function sendStr(index, words){
            var str='';
            for(var i=0; i<index; i++){
                str+= ' '+words[i];
            }
            return str+'...';
        };
        if(value !== undefined && value.length > 50) {
            var words = value.split(' '), str='';
            if(slen)
                return sendStr(slen, words);
            else
                return sendStr(3, words);
        }
        return value;
    };
});
