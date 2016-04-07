angular.module('starter.services', [])

.factory('Tasks', function() {
    
    var taskTypes = {taskNames: ["Work","Personal","Groceries"]};
    
    var todo = { list: [
        {task: "Dance", type: "Work", dateSet: new Date(), due: new Date()},
                         
                         
                         
                         
                         ]}
    
    var completedTasks = [
        
    
    ];
    
    //function to set a task
    function addToDo(task,type,due){
        //set the name
        var task = {task: task, type: type, dateSet: new Date(), due: new Date(due)};
        todo.list.push(task);
    }
    
    //function to allow a user to add a task category
    function addCategory(task){
        if(taskTypes.taskNames.indexOf(task)<0){
            console.log("adding");
            taskTypes.taskNames.push(task);
            
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
