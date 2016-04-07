angular.module('starter.controllers', [])

.controller('EntryCtrl', function($scope,Tasks) {
    
    var todo={
        task: "",
        type: "",
        due: new Date(),
        min: new Date()
       /* http://stackoverflow.com/questions/29086764/set-min-date-to-current-date-in-angularjs-input*/
    }
    $scope.todo=todo;
    //function
    function add (){
        Tasks.addToDo(todo.task,todo.type,todo.due);
        //passing in the local variable into the factory
        //user doesn't initially change the factory value
        //so if the whole thing explodes, nothing is permanently changed or lost
        //have to submit to actually add it and change in the factory
        //reset the local values
         console.log(todo.task + "Type "+ todo.type+todo.due);
        todo.task="";
        todo.type="";
        console.log(todo.task + "Type "+ todo.type);
        
    }
    $scope.add= add;
    $scope.taskTypes = Tasks.taskTypes;
  
})

.controller('ToDoCtrl', function($scope,Tasks,$ionicModal) {
    $scope.todo=Tasks.todo;
    //local toggles to control delete or update functions
    var toggles={
        delete: false,
        swipe: true
        
    }
    $scope.toggles=toggles;
    
    
    
    function update (index){
        console.log(index);
        
        $scope.change=Tasks.todo.list[index];
       

        $scope.openModal();
       
    }
    
    function archive(index){
        Task.archiveTask(Tasks.todo.list[index]);
    
    
    }
    
    function removeTask(index){
        Tasks.todo.list.splice(index,1);
        //removes
    }
    $scope.removeTask=removeTask;
    

    $scope.update=update;
   
    
    
    
    $ionicModal.fromTemplateUrl('templates/update-modal.html',{
        scope: $scope,
        animation: 'slide-in-up'
        
    }).then(function(modal){
        $scope.modal=modal
        
        
    })
    

    $scope.openModal = function() {
    $scope.modal.show();
    
    }

    $scope.closeModal = function() {
    $scope.modal.hide();
      
        
        
    };

    $scope.$on('$destroy', function() {
    $scope.modal.remove();
        
    });
    

})

.controller('FilterCtrl', function($scope,Tasks,$ionicModal) {
    $scope.taskTypes=Tasks.taskTypes;
    //for the modal
    
    $scope.newCat={
        title: ""
    }
    
    function addCat(){
        Tasks.addCategory($scope.newCat.title);
        $scope.closeModal();
        //close the modal
    }
    $scope.addCat=addCat;
    $scope.addType= function (){
        console.log("error");
        $scope.openModal();
    }
    
    
        $ionicModal.fromTemplateUrl('templates/cat-modal.html',{
        scope: $scope,
        animation: 'slide-in-up'
        
    }).then(function(modal){
        $scope.modal=modal
        
        
    })
    

    $scope.openModal = function() {
    $scope.modal.show();
    
    }

    $scope.closeModal = function() {
    $scope.modal.hide();
      
        
        
    };

    $scope.$on('$destroy', function() {
    $scope.modal.remove();
        
    });
    
    //completed tasks and stuff
    $scope.completedTasks=Tasks.completedTasks;



})

;
