angular.module('starter.controllers', [])

.controller('EntryCtrl', function($scope,Tasks) {
    var todo={
        task: "",
        type: ""
    }
    $scope.todo=todo;
    //function
    function add (){
        Tasks.addToDo(todo.task,todo.type);
        //passing in the local variable into the factory
        //user doesn't initially change the factory value
        //so if the whole thing explodes, nothing is permanently changed or lost
        //have to submit to actually add it and change in the factory
        //reset the local values
         console.log(todo.task + "Type "+ todo.type);
        todo.task="";
        todo.type="";
        console.log(todo.task + "Type "+ todo.type);
        
    }
    $scope.add= add;
    $scope.taskTypes = Tasks.taskTypes;
  
})

.controller('ToDoCtrl', function($scope,Tasks) {
    $scope.todo=Tasks.todo;

})

.controller('FilterCtrl', function($scope) {

})

;
