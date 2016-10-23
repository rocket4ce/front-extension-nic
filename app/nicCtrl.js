'use strict';

angular.module('app').controller('todoCtrl', function ($scope, $http) {
    $scope.newContent, $scope.hola,$scope.url,$scope.busqueda  = "";
    $scope.cargando = true;
    $scope.add = function() {
      $scope.cargando = false;
      $http({
      method: 'GET',
      url: 'https://api-nic.herokuapp.com/api/v1/'+$scope.newContent+''
      }).then(function successCallback(response) {
        $scope.cargando = true;
        var estado = response.data.estado;
        if (estado == 0) {
          angular.element('#dominio').removeClass("verde");
          angular.element('#dominio').addClass("rojo");
          $scope.hola = "El dominio esta tomado, averigua de quien es: ";
          $scope.busqueda = $scope.newContent+'.cl';
          $scope.url= "https://www.nic.cl/registry/Whois.do?d="+$scope.newContent+".cl";
        }else if (estado == 1) {
          angular.element('#dominio').removeClass("rojo");
          angular.element('#dominio').addClass("verde");
          $scope.hola = "Inicia sesión y registra el dominio: ";
          $scope.busqueda = $scope.newContent+'.cl';
          $scope.url= "https://clientes.nic.cl/registrar/logon.do";
        }else {
          $scope.hola = "debes ingresar un nombre";
        }
        // $scope.newContent = '';
      }, function errorCallback(response) {
        console.log(response);
      });
    }
});
