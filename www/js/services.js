angular.module('starter.services', [])

.factory('Tasks', function($ionicPopup) {
   
    //Mark Grimes
    //ToDo3000
    
    
 

    var taskTypes=[];
    //stores the types of tasks
    //user can add custom tasks
    var map = new Map();
    //map has a key: taskType and a value of a list
    
    //got a lot of use out of this when creating map
    //http://bjorn.tipling.com/maps-sets-and-iterators-in-javascript
    
    var completedTasks = [];
    //if the user wishes to archive tasks
        
    var allTasks=[{task: "Show All Tasks", description:"Your Tasks will show here!", type: "Work", dateSet: new Date(), due: new Date()}];
    //all tasks is simply an array of task objects that updates with all of the map values
    //should the user want to see it all
    
   
    
    
    
  
    
    function fillTypes(){
        //if theres nothing stored
        //it fills the taskTypes with the default fields
        //this is run when the program starts
        //if theres stuff stored
        //it will do nothing
        taskTypes = JSON.parse(window.localStorage.getItem('taskTypes'));
        
        if(taskTypes==null){
         taskTypes=[
        {title: "Work",
        colour: "positive"},
        {title: "Personal",
        colour: "energized"}
         ]
         //these are the default two categories
         //the user can add 3 on top of this
         //capped it at 5 categories max
        }

    }
    loadData();
    //attempts to fill the objects from local storage
    

    
    function loadData(){
        //calls two functions which fill up the taskTypes and the map
        fillTypes();
        fillMap();
        fillArchive();
        convertToDate();
        //more comprehensive information on these functions below
    }
    
    
    

    function fillMap(){
        //go through each taskType
        //attempt to access a stored object on each one
        for(var i=0;i<taskTypes.length;i++){
            if(map.has(taskTypes[i].title)==false){
                //if the key isn't there then we need to build the map
                console.log("It hasn't got task type");
                map.set(taskTypes[i].title,[]);
                //place the task type into the map
                
                //now in the map
            }
           
            
            var storedList=JSON.parse(window.localStorage.getItem(taskTypes[i].title));
            //check if its null
            if(storedList!=null){
                
                var mapList = map.get(taskTypes[i].title);
                //get a reference to the maps list
                
                mapList.push.apply(mapList,storedList);
                //push the stored list into the map
                //use apply to push each object seperately
                //otherwise it would push the array as one object!
                
            }//if theres something stored
        }//for each task type
    }//fillMap
    
    function convertToDate(){
        //we must convert the things taken in from JSON storage
        //otherwise it would just be strings
        //make them date objects
        
        for(var key of map.keys()){
            console.log("key "+key)
            //for every key in the map
            var list = map.get(key);
            //get the value list associated with each key
            for(var j=0;j<list.length;j++){
                list[j].dateSet=new Date(list[j].dateSet);
                list[j].due=new Date(list[j].due);
                //convert everything to dates
            }
        }
        
        for(var item in completedTasks){
                completedTasks[item].dateSet=new Date(completedTasks[item].dateSet);
                 completedTasks[item].due=new Date(completedTasks[item].due);
            //do the same as above for the completed task object
            //stored in its own list instead of a map
        }
    }
    
    //=============================================
    
    function fillArchive(){
        completedTasks=JSON.parse(window.localStorage.getItem('completedTasks'));
        
        if(completedTasks==null||completedTasks==undefined||completedTasks==""){
         completedTasks=[];
        }
      
    }
    

    //stores taskTypes
    //-----
    
    function storeTypes(){
        //window.localStorage.setItem('taskTypes',{});
        window.localStorage.setItem('taskTypes',JSON.stringify(taskTypes));
        //simply stores all taskTypes
    }
    function storeMaps(){
        
        for(var key of map.keys()){
            window.localStorage.setItem(key,JSON.stringify(map.get(key)));
            // should store "Work", and the object array associated with it
            //do this for every task type
            //this can change, if the user has custom tasks
            //so it makes sense to use key of map.keys
        }
        
    }
    
    function storeArchive(){
         window.localStorage.setItem('completedTasks',JSON.stringify(completedTasks));
        //stores completed tasks
        
        
        
    }
    
    
    function saveData(){
        window.localStorage.clear();
        storeTypes();
        storeMaps();
        storeArchive();
        //saves the data!
    }
    
    function deleteAllData(){
        //http://stackoverflow.com/questions/7667958/clear-localstorage
        window.localStorage.clear();
        console.log("Clearing everything");
        taskTypes.length=0;
        taskTypes.push(
        {title: "Work",
        colour: "positive"});
        taskTypes.push({title: "Personal",
        colour: "energized"});
        //resets everything
         
        map.clear();
        fillMap();
        //must update map
    }
    

    
    function removeType(index){
        if(index>1){
            //need to remove map
            //dont want to be able to remove the defaults
            map.delete(taskTypes[index].title);
           
            taskTypes.splice(index,1);
            //splices whatever tasktype was chosen out of the list
            showAllTasks();
            //update all tasks
            
            saveData();
            //saves the update

        }else{
            showTypeRemovalError();
            //using $ionicpopup to show an error
        }
    }//removeType
    


    

    

    
    function showAllTasks(){
        //create a list that holds everything
        allTasks.length=0;
        //clear the old "all" tasks
        
     
        for(var key of map.keys()){
            console.log(key);
            //Get the values in the map key
            //in this case an array of task objects
            //using push.apply instead of just push
            //I can add each item in the array
            allTasks.push.apply(allTasks,map.get(key));
            //this is pass by reference
            //so if I end up changing something in the allTasks
            //I will also change it in the map list
            //science
        }
        for(var item of allTasks){
            console.log(item.task+" "+item.type);
        }
        return allTasks;
        
        
    }
    
    function getCategoryTasks(category){
        console.log("Attempting to get category");
        if(map.has(category)){
            console.log("returning "+category);
            return map.get(category);
            
        }else{
            console.log("error");
        }
    }
    
    function addTaskToMap(task,description,type,due){
        var valid=validateInput(task,type);
        if(valid==true){
            var task = {task: task, description: description, type: type, dateSet: new Date(), due: new Date(due)};
            
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
            
            if(map.has(type)){
                var list = map.get(type);
                console.log(task.task);
                list.push(task);
                for(t in list){
                    console.log(list[t].task);
                }
                //map has key
            }
                
        }//if
        //must update local storage
        saveData();
        
    }//end function
    
    //functions to sort the lists
    //http://www.javascriptkit.com/javatutors/arraysort2.shtml
    //got information on sorting arrays from here
    
    function sortTaskDueDate(a,b){
        //sort by the due date
        var dateA = new Date(a.due);
        var dateB = new Date(b.due);
        return dateA-dateB;
        //sorts based on positive or negative return
        
        
    }
    
    function sortTaskDateSet(a,b){
        //sort by the date set
        var dateA = new Date(a.dateSet);
        var dateB = new Date(b.dateSet);
        return dateA-dateB;
        //sorts based on positive or negative return
        
        
    }
    
    
    
    function sortTaskAZ(a,b){
        var taskA = a.task.toLowerCase();
        var taskB = b.task.toLowerCase();
        if(taskA>taskB){
            return 1;
            //A is greater than B
        }else if(taskA<taskB){
            return -1;
            //A is less than B
        }else{
            return 0;
            //both are even, do nothing
        }
        
        
    }
    
    //sorts allTasks

    
    function sortTask(choice){
        //this switches the active view to all tasks
        //then sorts all tasks by whatever choice was made
        //switch statement
        //uses a different way of comparing objects
        console.log("Choice"+choice);
        showAllTasks();
        
        switch(choice){
            case 'A':
                //A for alphabet
                allTasks.sort(sortTaskAZ);
                break;
            case 'D':
                allTasks.sort(sortTaskDueDate);
                //D for Due
                break;
            case 'S':
                allTasks.sort(sortTaskDateSet);
                //S for set
                break;
            default:
                console.log("Error");
                break;            
                
        }//switch
        
    }
    

    

    function clearCompletedTasks(){
        completedTasks.length=0;
        storeArchive();
        //save data
    }
    
    
    function validateInput(task,type){
        //the purpose of this function is to ensure that the user has placed enough info to add a new entry
        
        //first check if the task has been entered
        //this is manditory - you can't have a blank task
        if(task==null||task==undefined||task==""){
            console.log("error");
            showTaskError();
            return false;
            
            //can't continue as they haven't entered anything!
        }
        //description is allowed to be blank so no need to break
        //now check type
        if(type==null||type==undefined||type==""){
            showTaskError();
            return false;
            
            //needs a type
           
        }
        return true;
        //if it passed the validation check
        //continue!
        
        
    }
    
    //function to allow a user to add a task category
    
    function addCategory(task){
        
        //first check if there are already 5 categories
        //2 default
        //3 custom
        //this is the limit!
        if(taskTypes.length>=5){
            showTooManyCats();
            return;
            //shows a pop up saying to delete a few!
        }
        //Need to check to see if the object is already in the taskType array
        //derived solution from here
        //http://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-object
        var found=false;
        //first check that its not null, undefined or an empty string
        if(task==""||task==null||task==undefined){
            console.log("Can't add nothing!")
            return;
        }
        //returns if its not a valid entry
       
        for(var i=0;i<taskTypes.length;i++){
            if(taskTypes[i].title==task){
                found=true;
                break;
                //if its found, it cannot be added again!
            }
        }
        if(found==false){
            console.log("adding");
            //the colour
            var length=taskTypes.length;
            var col;
            //sets a different colour based off of the custom category
            //for maximum prettiness
            switch(length){
                case 2:
                    col="calm";
                    break;
                case 3:
                    col="assertive";
                    break;
                default:
                    col="royal";
                    
            }
            taskTypes.push({title: task, colour: col});
            
            //updates the map so that it contains the new value!
            
            updateMap();
            
            
            saveData();
            //saving the data
           
            
            
        }else{
            console.log("its already there!");
            //this was just test code
        }
        
    }
    

    //adds a tasktype key to the map
         function updateMap(){
         for(var i=0;i<taskTypes.length;i++){
             //check if its already there
             console.log(taskTypes[i].title);
             //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
             
             if(map.has(taskTypes[i].title)){
                 //do nothing if its already there
             }else{
                 //filling map
                 //create a key and add an empty array
                 map.set(taskTypes[i].title,[]);
                 
             }
             
         }

     }
    
    //function to archive Tasks
    function archiveTask(task){
        
        completedTasks.push(task);
        //pushes whatever object the user wanted to push into the completed task
        //then saves the archive
        storeArchive();
        console.log("Task Archived");
    
    }
    
    //=================================
    //popups
    //got info from here!
    //http://ionicframework.com/docs/api/service/$ionicPopup/
    var showTypeRemovalError = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Error!',
         template: 'You cannot remove Work or Personal Default Categories'
       });

       alertPopup.then(function(res) {
         console.log('typeError');
       });
     };
    
    var showTooManyCats = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Error!',
         template: 'You can only have 3 custom categories at once.'
       });

       alertPopup.then(function(res) {
         console.log('typeError');
       });
     };
    
     var showAbout = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'ToDo3000',
         template: 'A Todo app created by Mark Grimes. It allows you to set and update tasks, as well as assign custom categories.'
       });

       alertPopup.then(function(res) {
         console.log('About Message');
       });
     };
    
     var showTaskError = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Error!',
         template: 'Task or Type cannot be empty!'
       });

       alertPopup.then(function(res) {
         console.log('Empty Task Error');
       });
     };
    
    
    
  
  return {
      taskTypes: taskTypes,
      addCategory: addCategory,
      archiveTask: archiveTask,
      completedTasks: completedTasks,
      addTaskToMap: addTaskToMap,
      getCategoryTasks: getCategoryTasks,
      allTasks: allTasks,
      showAllTasks: showAllTasks,
      removeType: removeType,
      clearCompletedTasks: clearCompletedTasks,
      storeTypes: storeTypes,
      saveData: saveData,
      deleteAllData: deleteAllData,
      sortTask: sortTask,
      showAbout: showAbout

  };
})

;