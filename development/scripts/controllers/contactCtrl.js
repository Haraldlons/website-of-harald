(function(){
	'use strict'
	/*Harald Code*/
angular.module("mainApp")
.controller("contactCtrl", ['$scope', function($scope){
	console.log("contactCtrl loaded")

	var vm = this;

	vm.melding = "Hei fra Contact Ctrl!";

}]); /*End homeCtrl*/



})(); /*End function scope*/