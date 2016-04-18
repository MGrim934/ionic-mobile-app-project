angular.module('starter.controllers', [])

.controller('EntryCtrl', function($scope,Tasks,$ionicModal) {
    
    //Mark Grimes
    
    //this is what the user actually manipulates in the view
    var todo={
        task: "",
        type: "Work",
        description: "",
        due: new Date(),
        min: new Date()
       /* http://stackoverflow.com/questions/29086764/set-min-date-to-current-date-in-angularjs-input*/
    }
    
    //when the user selects a category, change the type to that category
    function selectType(index){
        todo.type=Tasks.taskTypes[index].title;
        
        
    }
    $scope.selectType=selectType;
    
    $scope.todo=todo;
    //makes todo available in the view
    //function
    function add (){
        
        Tasks.addTaskToMap(todo.task,todo.description,todo.type,todo.due);
        
        //passing in the local object variable into the factory
        //user doesn't initially change the factory value
        //so if the whole thing explodes, nothing is permanently changed or lost
        //have to submit to actually add it and change in the factory
        //reset the local values
       
        todo.task="";
        todo.description="";
        //resets the view
        
        //goes back to work
        
       
        
    }
    $scope.add= add;
    $scope.taskTypes = Tasks.taskTypes;
    
  
})

.controller('ToDoCtrl', function($scope,Tasks,$ionicModal) {

    $scope.taskTypes=Tasks.taskTypes;
    
    $scope.taskCat={title:"ToDo 3000", colour:"royal"};
    //this is just the default Heading
    
    //task cat gets the category so that the task type colour can be displayed in the heading
    $scope.completedTasks=Tasks.completedTasks;
    
    $scope.sortTask= function(){
     
        changeViewAll();
        //change the view to all tasks
        //then sort all the tasks
        Tasks.sortTask($scope.sort.choice);
        
    }
    //this is updated by the select button
    //this in turn feeds into the function in the factory which decides how to sort the view
    $scope.sort={
        choice: ''
    }
    
    $scope.viewCategory={
        view:'Tasks'
    }
    

    
    $scope.currentView=Tasks.getCategoryTasks("Work");
    $scope.taskCat.title="Work";
   
    //defaults to work
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
        //gets the view category that displays in the header

        $scope.viewCategory.view=Tasks.taskTypes[index].title;
        //gets whatever list is requested
        $scope.currentView=Tasks.getCategoryTasks(Tasks.taskTypes[index].title);
        $scope.taskCat=Tasks.taskTypes[index];
        //changes the view based on the array index of taskTypes
        if(toggles.swipe==false)
        toggles.swipe=true;
    }
    
    function changeViewAll(){
        Tasks.showAllTasks();
        //updates the array with all the objects
        $scope.viewCategory.view="All Active Tasks";
        //ensures allTasks view is up to date
        $scope.taskCat={title: "All", colour: "royal"};
        //displays at the top of the screen
        //make sure its swipable
        //if we go to view completed tasks it will change to false
        if(toggles.swipe==false)
        toggles.swipe=true;
        
        $scope.currentView=Tasks.allTasks;
    }

    
    function viewArchive(){
        console.log("view complete");
        $scope.currentView=Tasks.completedTasks;
        $scope.taskCat={title: "Completed", colour: "balanced"};
        //need to make it so they cant try and archive the archive
        toggles.swipe=false;
    }
    $scope.viewArchive=viewArchive;
    $scope.changeViewAll=changeViewAll;
    $scope.changeView=changeView;
    

    
    
    function getTaskType(task){
        //this is so we can display the update form in the right colour
        var type;
        for(var i=0;i<Tasks.taskTypes.length;i++){
            if(Tasks.taskTypes[i].title==task.type){
                type=Tasks.taskTypes[i];
                console.log(type.title+" "+type.colour);
                return type;
                //take the type in the todo list object
                //and find the correlating colour in the tasktypes object array
            }
        }
        
    }
    function update (index){
        console.log(index);
        console.log($scope.currentView[index].type);
        
        $scope.change=$scope.currentView[index];
        //get a reference to the task type
        //now we can make changes to whatever object was at that index!
        $scope.taskCat=getTaskType($scope.change);
        //get a reference to the object we want to change
        
        
       
       

        $scope.openModal();
        //opens a model
       
    }
    
    function archive(index){
        console.log("Archive: "+$scope.currentView[index].type);
        //call the archive method
        //we wish to archive this current object
        Tasks.archiveTask($scope.currentView[index]);
        //now remove the task
        //we dont want it in the primary view anymore though
        removeTask(index);
        //splices it out of whatever list it was in
    
    
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
                //removehere makes sure we change to the proper list
                //need to make sure we are removing from the proper array
                //then check to see if the object is in that array
                //then remove based on the index passed
                console.log($scope.removeHere[i].task);
                console.log($scope.currentView[index].task);
                
                console.log("I found you");
                $scope.removeHere.splice(i,1);
                Tasks.saveData();
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
   
    
    
    //modal derived from ionics website
    
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
    Tasks.saveData();
      
        
        
    };

    $scope.$on('$destroy', function() {
    $scope.modal.remove();
        
    });
    

})

.controller('SettingsCtrl', function($scope,Tasks,$ionicModal) {
    $scope.taskTypes=Tasks.taskTypes;
    $scope.storeTypes=Tasks.storeTypes;
    
    $scope.showAbout= function(){
        Tasks.showAbout();
        //triggers the ionic popup
    }
    

    


    //for the modal
    
    $scope.newCat={
        title: ""
    }
    $scope.toggle= {
        swipe: true,
        delete: false
    }
    function showDelete(){
        console.log("Test");
        if($scope.toggle.delete==false){
            $scope.toggle.delete=true;
        }else{
            $scope.toggle.delete=false;
        }
    }
    $scope.showDelete=showDelete;
 
    function removeType(index){
        console.log("Removing" + $scope.taskTypes[index].title);
        Tasks.removeType(index);
        //removes a category
    }
    $scope.removeType=removeType;
    
    
    function addCat(){
        Tasks.addCategory($scope.newCat.title);
        $scope.closeModal();
        //close the modal
        $scope.newCat.title="";
    }
    $scope.addCat=addCat;
    
    //modal stuff derived from ionic's website
    //to add another category
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
