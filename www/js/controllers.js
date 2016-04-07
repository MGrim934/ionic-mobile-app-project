angular.module('starter.controllers', [])

.controller('EntryCtrl', function($scope,Tasks,$ionicModal) {
    
    var todo={
        task: "",
        type: Tasks.taskTypes[Tasks.taskTypes.length-1].title,
        description: "",
        due: new Date(),
        min: new Date()
       /* http://stackoverflow.com/questions/29086764/set-min-date-to-current-date-in-angularjs-input*/
    }
    $scope.todo=todo;
    //function
    function add (){
        Tasks.addToDo(todo.task,todo.description,todo.type,todo.due);
        //passing in the local variable into the factory
        //user doesn't initially change the factory value
        //so if the whole thing explodes, nothing is permanently changed or lost
        //have to submit to actually add it and change in the factory
        //reset the local values
        console.log(todo.task + "Type "+ todo.type+todo.due);
        todo.task="";
        todo.description="";
        
       
        
    }
    $scope.add= add;
    $scope.taskTypes = Tasks.taskTypes;
    
    
    $scope.newCat={
        title: ""
    }
    
    function addCat(){
        Tasks.addCategory($scope.newCat.title);
        $scope.closeModal();
        //this ensures that if a user adds a task that it will be the new category they just set
        //otherwise can result in an error
        //i.e. an attempt to add an empty type
        todo.type=Tasks.taskTypes[Tasks.taskTypes.length-1].title;
        //close the modal
        //reset the value
        $scope.newCat.title="";
    }
    $scope.addCat=addCat;
    
    
    
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
  
})

.controller('ToDoCtrl', function($scope,Tasks,$ionicModal) {
    $scope.todo=Tasks.todo;
    //local toggles to control delete or update functions
    var toggles={
        delete: false,
        swipe: true,
        update:false
        
    }
    $scope.toggles=toggles;
    

    

    
    
    
    function update (index){
        console.log(index);
        
        $scope.change=Tasks.todo.list[index];
       

        $scope.openModal();
       
    }
    
    function archive(index){
        Tasks.archiveTask(Tasks.todo.list[index]);
        //now remove the task
        removeTask(index);
    
    
    }
    
    function removeTask(index){
        Tasks.todo.list.splice(index,1);
        //removes
    }
    $scope.removeTask=removeTask;
    

    $scope.update=update;
    $scope.archive=archive;
   
    
    
    
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
