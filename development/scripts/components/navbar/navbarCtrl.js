(function(){
	'use strict'
	/*Harald Code*/
angular.module("mainApp")
.controller("navbarCtrl", ['$scope', '$state', function($scope, $state){
	console.log("navbarCtrl loaded")

	var vm = this;

	vm.melding = "Hei fra navbarCtrl!";

	vm.currentNavItem = 'page1';
	vm.isCompany = false; 
	vm.loggedIn = false;

    vm.goto = function(page) {
      console.log("Goto " + page);
      if(page==="contact"){
      	$state.go("contact")
      }else if(page === "about"){
      	$state.go("about")
      }else if(page === "home"){
      	$state.go("home")
      }
    }

    vm.links = {
				main: [
					{ state: 'home', icon: 'fa-newspaper-o', name: 'Hjem' },
					{ state: 'about', icon: 'fa-info', name: 'Informasjon' },
					{ state: 'companies', icon: 'fa-building-o', name: 'Bedrifter' },
					{ state: 'contact', icon: 'fa-users', name: 'Kontakt' },
					{ state: 'cv_database', icon: 'fa-graduation-cap', name: 'CV-database! (Nytt)' }, 
					{ state: 'teaser', icon: 'fa-youtube', name: 'Teaser' },
					// { state: 'atmel', icon: 'fa-newspaper-o', name: 'Atmel' }

				],
				side: [
					{ state: 'login', icon: 'fa-sign-in', name: 'Logg inn' },
					{ state: 'user', icon: 'fa-cog', name: 'Brukernavn'/*self.username*/ },
					{ state: 'menu', icon: 'fa-bars', name: 'Meny' }
				]
			};

	function goToProfile(){
		$state.go("about");
	}

	function logOut(){
		$state.go("home")
	}

}]); /*End homeCtrl*/



})(); /*End function scope*/