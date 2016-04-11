angular.module('starter.services', [])

.factory('Tasks', function() {
    
 
    
 /*   var taskTypes=[
        {title: "Work"},
        {title: "Personal"},
        {title: "Groceries"}
    ]*/
    
    var taskTypes = JSON.parse(window.localStorage.getItem('taskTypes'));
    var map = new Map();
    
    
    
    
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
                
                mapList.push.apply(mapList,storedList);
                //push the stored list into the map
                //use apply to push each object seperately
                
            }//if theres something stored
        }//for each task type
    }//fillMap
    
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
    
    function saveData(){
        storeTypes();
        storeMaps();
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
            map.delete(taskTypes[index].title);
            taskTypes.splice(index,1);
            showAllTasks();
            //update all tasks

        }
    }//removeType
    

    //got a lot of use out of this when creating map
    //http://bjorn.tipling.com/maps-sets-and-iterators-in-javascript
    
    //updateMap();
    
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
    
    
    var allTasks=[{task: "Test", description:"I need to dance..", type: "Work", dateSet: new Date(), due: new Date()}];
    
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
        if(map.has(category)){
            return map.get(category);
        }
    }
    
    function addTaskToMap(task,description,type,due){
        var valid=validateInput(task,type);
        if(valid==true){
            var task = {task: task, description: description, type: type, dateSet: new Date(), due: new Date(due)};
            
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
        
    }//end function
    

    
    var completedTasks = [
        
    
    ];
    function clearCompletedTasks(){
        completedTasks.length=0;
    }
    
    //function to set a task
    function addToDo(task, description, type,due){
        //set the name
        var valid=validateInput(task,type);
        if(valid==true){
        var task = {task: task, description: description, type: type, dateSet: new Date(), due: new Date(due)};
        todo.list.push(task);
        }else{
            console.log("Did not pass validation");
        }
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
            
        }else{
            console.log("its already there!");
        }
        
    }
    
    //function to archive Tasks
    function archiveTask(task){
        
       // var archivedTask = {task: task.task, type: task.type, dateSet: new Date(task.dateSet), due: new Date(task.due)};
        completedTasks.push(task);
        console.log("Task Archived");
    
    }
    
    
    
  
  return {
      taskTypes: taskTypes,
      addToDo: addToDo,
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
      deleteAllData: deleteAllData

  };
})

;