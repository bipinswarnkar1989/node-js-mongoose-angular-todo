var MyTodo = angular.module('MyTodo',[]);

function mainController($scope,$http){
	$scope.formData = {};
	
	//when landing on the page get all todos and show them
	$http.get('/todos')
	  .success(function(data){
		$scope.todos = data;
		console.log(data);
	   })
	   .error(function(data){
		   console.log('Error: '+data);
	   });
	
	//when submitting the create todo form,send the text to the node API
	$scope.createTodo = function(){
		$http.post('/create_todo',$scope.formData)
		    .success(function(data){
		    	$scope.formData = {} //clear the form so user can fill another
		    	$scope.todos = data;
		    	console.log(data);
		    })
		    .error(function(data){
		    	console.log('Error: '+data);
		    });
	};
	
	//delete a todo after checking it
	$scope.deleteTodo = function(id){
		$http.delete('/delete/'+id)
		 .success(function(data){
			 $scope.todos = data;
			 console.log(data);
		 })
		 .error(function(data){
			 console.log('Error: '+data);
		 });
	};
}