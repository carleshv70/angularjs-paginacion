var app = angular.module('paginacionApp.controladores',[]);

app.controller('paisesCtrl', ['$scope','Paises', function($scope, paisesService){

    $scope.paisesService = paisesService;
    $scope.paises = [];
    $scope.arrPagination = []
    $scope.totalPages = 0;
    $scope.numberPage = 0;
    $scope.$watch('paisesService.data.countries', function(newValue, oldValue, scope ) {

        scope.paises = newValue;
        updatePaginas();    
    });
    $scope.paises = paisesService;

    $scope.goToLastPage = function() {
        paisesService.loadLastPage();
        updatePaginas();        }

    $scope.goToFirstPage = function() {
        paisesService.loadFirstPage();
        updatePaginas();    
    }

    $scope.goToPage = function(num) {
        paisesService.loadPage(num);
        updatePaginas();    
    }

    function updatePaginas() {

        $scope.totalPages = $scope.paisesService.data.totalPages;
        $scope.numberPage =  $scope.paisesService.data.numberPage;

        var arr = [];
        var cnt = 0;
        console.log($scope.paises);
        for( var i = Math.max($scope.numberPage-5,1); i< $scope.totalPages; i++) {
            if (i == $scope.numberPage) {
                continue;
            }
            cnt++;

            console.log(cnt);
            arr.push(i);
            if (cnt >= 10) {
                break;
            }
        }
        $scope.arrPagination = arr;
    }

}]);