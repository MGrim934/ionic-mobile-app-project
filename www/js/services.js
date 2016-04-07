angular.module('starter.services', [])

.factory('Tasks', function() {
    
 
    
    var taskTypes=[
        {title: "Work"},
        {title: "Personal"},
        {title: "Groceries"}
    ]
    
    var todo = { list: [
        {task: "Dance", description:"I need to dance..", type: "Work", dateSet: new Date(), due: new Date()},
                         
                 ]}
    
    var completedTasks = [
        
    
    ];
    
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
            
        }else{
            console.log("its already there!");
        }
        
    }
    
    //function to archive Tasks
    function archiveTask(task){
        
        var archivedTask = {task: task.task, type: task.type, dateSet: new Date(task.dateSet), due: new Date(task.due)};
        completedTasks.push(archivedTask);
        console.log("Task Archived");
    
    }
    
    
    
  
  return {
      taskTypes: taskTypes,
      addToDo: addToDo,
      todo: todo,
      addCategory: addCategory,
      archiveTask: archiveTask,
      completedTasks: completedTasks

  };
})

;
