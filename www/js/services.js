angular.module('starter.services', [])

.factory('Tasks', function() {
   
    
    //primary todo list
    //allow sorting of each list not just allTasks
    //make it auto save when something is added
    //instantly update when clear
    //make completed tasks viewable in to do
    //settings shouldl just have buttons and options
    //not a view into the tasks themselves
    //would be redundant
    //START STYLING
    
    //setting up archive storage -done
    //must make it save on each update -done?
    //make filter better
    //popup?
    
    //when clear all data
    //must also clear from map
    
    //change select to buttons?
    
    
 
    
 /*   var taskTypes=[
        {title: "Work"},
        {title: "Personal"},
        {title: "Groceries"}
    ]*/
    
    var taskTypes = JSON.parse(window.localStorage.getItem('taskTypes'));
    var map = new Map();
    var completedTasks = [];
    
    
    
    
    function fillTypes(){
        //if theres nothing stored
        //it fills the taskTypes with the default fields
        //this is run when the program starts
        //if theres stuff stored
        //it will do nothing
        
        if(taskTypes==null){
         taskTypes=[
        {title: "Work"},
        {title: "Personal"},
        {title: "Groceries"}]
        }
        
        //loop through each task type
        //fill the map key with each stored array
        
    }
    
    function loadData(){
        //calls two functions which fill up the taskTypes and the map
        fillTypes();
        fillMap();
        fillArchive();
        convertToDate();
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
            //now append to the map
            
            var storedList=JSON.parse(window.localStorage.getItem(taskTypes[i].title));
            //check if its null
            if(storedList!=null){
                
                var mapList = map.get(taskTypes[i].title);
                //get a reference to the maps list
                
                //FIX THIS
      
               
                
                mapList.push.apply(mapList,storedList);
                
                //push the stored list into the map
                //use apply to push each object seperately
                
            }//if theres something stored
        }//for each task type
    }//fillMap
    
    function convertToDate(){
        
        for(var key of map.keys()){
            console.log("key "+key)
            var list = map.get(key);
            for(var j=0;j<list.length;j++){
                list[j].dateSet=new Date(list[j].dateSet);
                list[j].due=new Date(list[j].due);
            }
        }
        
        for(var item in completedTasks){
                completedTasks[item].dateSet=new Date(completedTasks[item].dateSet);
                 completedTasks[item].due=new Date(completedTasks[item].due);
        }
    }
    
    //=============================================
    
    function fillArchive(){
        completedTasks=JSON.parse(window.localStorage.getItem('completedTasks'));
        
        if(completedTasks==null||completedTasks==undefined||completedTasks==""){
         completedTasks=[];
        }
      
    }
    
    loadData();
    //this will attempt to load any stored data in
    
    function storeTypes(){
        window.localStorage.setItem('taskTypes',JSON.stringify(taskTypes));
        //simply stores all taskTypes
    }
    function storeMaps(){
        
        for(var key of map.keys()){
            window.localStorage.setItem(key,JSON.stringify(map.get(key)));
            //eg should store "Work", and the object array associated with it
        }
        
    }
    
    function storeArchive(){
         window.localStorage.setItem('completedTasks',JSON.stringify(completedTasks));
        
        
        
    }
    
    
    function saveData(){
        storeTypes();
        storeMaps();
        storeArchive();
        //saves the data!
    }
    
    function deleteAllData(){
        //http://stackoverflow.com/questions/7667958/clear-localstorage
        window.localStorage.clear();
        console.log("Clearing everything");
    }
    
    function removeType(index){
        if(index>2){
            //need to remove map
            //dont want to be able to remove the defaults
            map.delete(taskTypes[index].title);
            window.localStorage.removeItem(taskTypes[index].title);
            taskTypes.splice(index,1);
            showAllTasks();
            //update all tasks
            saveData();

        }
    }//removeType
    

    //got a lot of use out of this when creating map
    //http://bjorn.tipling.com/maps-sets-and-iterators-in-javascript
    

    
    
    var allTasks=[{task: "Show All Tasks", description:"Your Tasks will show here!", type: "Work", dateSet: new Date(), due: new Date()}];
    
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
        console.log("TTTTTTTTTTTEST");
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
    //TODO? implement sorting in whatever list is in the view and not just all tasks
    
    function sortTask(choice){
        console.log(choice);
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
        saveData();
        //save data
    }
    
    
    function validateInput(task,type){
        //the purpose of this function is to ensure that the user has placed enough info to add a new entry
        
        //first check if the task has been entered
        //this is manditory - you can't have a blank task
        if(task==null||task==undefined||task==""){
            console.log("error");
            return false;
            //can't continue as they haven't entered anything!
        }
        //description is allowed to be blank so no need to break
        //now check type
        if(type==null||type==undefined||type==""){
            return false;
            //needs a type
           
        }
        return true;
        //if it passed the validation check
        //continue!
        
        
    }
    
    //function to allow a user to add a task category
    
    function addCategory(task){
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
            }
        }
        if(found==false){
            console.log("adding");
            taskTypes.push({title: task});
            //updates the map so that it contains the new value!
            updateMap();
            saveData();
            
        }else{
            console.log("its already there!");
        }
        
    }
    

    //adds a tasktype key to the map
         function updateMap(){
         for(i in taskTypes){
             //check if its already there
             console.log(taskTypes[i].title);
             //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
             if(map.has(taskTypes[i].title)){
                 //do nothing
             }else{
                 //filling map
                 console.log("adding key "+taskTypes[i].title);
                 map.set(taskTypes[i].title,[]);
                 
             }
             
         }
     }
    
    //function to archive Tasks
    function archiveTask(task){
        
       // var archivedTask = {task: task.task, type: task.type, dateSet: new Date(task.dateSet), due: new Date(task.due)};
        completedTasks.push(task);
        saveData();
        console.log("Task Archived");
    
    }
    
    
    
  
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
      sortTask: sortTask

  };
})

;