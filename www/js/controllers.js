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
        //Tasks.addToDo(todo.task,todo.description,todo.type,todo.due);
        Tasks.addTaskToMap(todo.task,todo.description,todo.type,todo.due);
        //passing in the local variable into the factory
        //user doesn't initially change the factory value
        //so if the whole thing explodes, nothing is permanently changed or lost
        //have to submit to actually add it and change in the factory
        //reset the local values
       // console.log(todo.task + "Type "+ todo.type+todo.due);
        todo.task="";
        todo.description="";
        
       
        
    }
    $scope.add= add;
    $scope.taskTypes = Tasks.taskTypes;
    
    
    $scope.newCat={
        title: ""
    }
    
    //runs from cat-modal.html
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
    //$scope.todo=Tasks.todo;
   // $scope.storeTypes=Tasks.storeTypes;
    $scope.completedTasks=Tasks.completedTasks;
    $scope.sortTask=Tasks.sortTask;
    $scope.sort={
        choice: ''
    }
    

    $scope.taskTypes=Tasks.taskTypes;
    $scope.currentView=Tasks.getCategoryTasks("Work");
    $scope.allTasks=Tasks.allTasks;
    $scope.showAllTasks=Tasks.showAllTasks;
    //local toggles to control delete or update functions
    var toggles={
        delete: false,
        swipe: true,
        update:false,
        filter: false
        
    }
    function showFilter(){
        if(toggles.filter==false){
            toggles.filter=true;
        }else{
            toggles.filter=false;
        }
    }
    $scope.toggles=toggles;
    
    function changeView(index){
        console.log(Tasks.taskTypes[index].title);
        $scope.currentView=Tasks.getCategoryTasks(Tasks.taskTypes[index].title);
        //changes the view based on the array index of taskTypes
    }
    
    function changeViewAll(){
        Tasks.showAllTasks();
        //ensures allTasks view is up to date
        
        $scope.currentView=Tasks.allTasks;
    }
    function viewArchive(){
        console.log("view complete");
        $scope.currentView=Tasks.completedTasks;
    }
    $scope.viewArchive=viewArchive;
    $scope.changeViewAll=changeViewAll;
    $scope.changeView=changeView;
    

    
    
    
    function update (index){
        console.log(index);
        console.log($scope.currentView[index].type);
        //changeView($scope.currentView[index].type);
        $scope.change=$scope.currentView[index];
        //get a reference to the object we want to change
        
       
       

        $scope.openModal();
       
    }
    
    function archive(index){
        console.log("Archive: "+$scope.currentView[index].type);
        //call the archive method
        //we wish to archive this current object
        Tasks.archiveTask($scope.currentView[index]);
        //now remove the task
        //we dont want it in the primary view anymore though
        removeTask(index);
    
    
    }
    
    function removeTask(index){
        //find map
        console.log("found type: "+$scope.currentView[index].type);
        
        
        
        //need to move to the appropriate list
        //do this by getting the "type" from it and making "removeHere" reference that array
        
        $scope.removeHere=Tasks.getCategoryTasks($scope.currentView[index].type);
        console.log($scope.removeHere[0].title);
        //now compare
        for(var i=0;i<$scope.removeHere.length;i++){
            //we need to find it and remove it
            //http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
            //found this useful when researching object equality
            //when I use push.apply it passes the instance
            //so if I use === on objects in the two different arrays
            //it should return true, because the arrays are both referencing the same instance
         
            
            if($scope.removeHere[i]===$scope.currentView[index]&&$scope.removeHere[i]!=undefined){
                console.log($scope.removeHere[i].task);
                console.log($scope.currentView[index].task);
                
                console.log("I found you");
                $scope.removeHere.splice(i,1);
                //pass in i instead of index because its removeHere list we want to alter
                //get rid of object in that position
                //however there is potential for an error
                //allTasks still points to this object
                //we dont want that anymore since its archived
                //so we'll call showAllTasks to update the list with the most recent information
                //remove from this list
                Tasks.showAllTasks();
              
                
            }
        }
       // $scope.currentView.splice(index,1);
        //need to remove from both lists
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

.controller('SettingsCtrl', function($scope,Tasks,$ionicModal) {
    $scope.taskTypes=Tasks.taskTypes;
    $scope.storeTypes=Tasks.storeTypes;
    //for the modal
    
    $scope.newCat={
        title: ""
    }
    $scope.toggle= {
        swipe: true
    }
 
    function removeType(index){
        console.log("Removing" + $scope.taskTypes[index].title);
        Tasks.removeType(index);
    }
    $scope.removeType=removeType;
    
    
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
    //local storage stuff
    $scope.saveData=Tasks.saveData;
    $scope.deleteAllData=Tasks.deleteAllData;
    
    
    function clearCompletedTasks(){
        Tasks.clearCompletedTasks();
    }
    $scope.clearCompletedTasks=clearCompletedTasks;



})

;
