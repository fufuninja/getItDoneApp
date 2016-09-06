angular.module('hungToDo', ['toDoController', 'toDoService']);

angular.module('toDoController', [])
	.controller('mainController' , ['$scope' , '$http' , 'Todos' , function($scope, $http, Todos, $document){
		$scope.loading = true;
		$scope.formData={};

		Todos.get()
		.success(function(data){
			$scope.todos = data;
			$scope.loading = false;
		});

		$scope.createToDo = function(){
			if($scope.formData.text != undefined){
				$scope.loading=true;

				Todos.create($scope.formData)
					.success(function(data){
						$scope.loading = false;
						$scope.formData = {};
						$scope.todos = data;
					});
			}
		};

		$scope.deleteTodo = function(id){

			Todos.delete(id)
				.success(function(data){
					$scope.todos = data;
				});
		};
		
	}]);

angular.module('toDoService', [])
	.factory('Todos', ['$http', function($http) {
		return{
			get : function(){
				return $http.get('/api/todos');
			},
			create : function(toDoData){
				return $http.post('/api/todos' , toDoData);
			},
			delete: function(id){
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);






