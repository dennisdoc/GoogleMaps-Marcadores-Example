//Inicializando o aplicativo
var layout = angular.module("layout", ["ngRoute","ngResource","ngCordova","ui.bootstrap","uiGmapgoogle-maps",'ngMap']);

layout.config(['$routeProvider',function($routeProvider){
	$routeProvider.when("/", {
		templateUrl: "./pages/home/home.html",
		controller : "mapController"
	});
	$routeProvider.when("/login", {
		templateUrl: "./pages/login/login.html",
		controller : "loginControl"
	});
}]);

layout.config(
	    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
	        GoogleMapApiProviders.configure({
	            china: true
	        });
	    }]
);

angular.module('layout').config(['$controllerProvider', function($controllerProvider) {
    $controllerProvider.allowGlobals();
 }]);

//Configurando requisições ajax
layout.config(["$httpProvider",  function($httpProvider){
	
	//Adicionando interceptador para loading
	$httpProvider.interceptors.push('loadingHttpInterceptor');
}]);

//Interceptor http (Loading
layout.factory('loadingHttpInterceptor', function ($q, $window) {
	return{
		//Momento da requisição
		request: function(config){
			 $("#loading").show();
			 
			return config;
		},
		
		//Momento da resposta
		response:   function(config){
			$("#loading").hide();
			return config;
		},
		
		//Tratamento de erro
		responseError: function (response) {
			$("#loading").hide();
            return $q.reject(response);
        }
	}
});
