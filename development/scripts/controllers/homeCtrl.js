(function(){
	'use strict'
	/*Harald Code*/
angular.module("mainApp")
.controller("homeCtrl", ['$scope', function($scope){
	console.log("homeCtrl loaded")
	var vm = this;
	vm.melding = "Hei fra homeCtrl 6485 fiskeboller";

}]); /*End homeCtrl*/



})(); /*End function scope*/