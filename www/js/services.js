angular.module('starter.services', [])

.factory('Tasks', function() {
    
    var taskTypes = {taskNames: ["Work","Personal","Groceries"]};
    
    var todo = { list: [
        {task: "Dance", type: "Work", dateSet: new Date(), due: new Date()},
                         
                         
                         
                         
                         ]}
    
    //function to set a task
    function addToDo(task,type){
        //set the name
        var task = {task: task, type: type, dateSet: new Date(), due: new Date()};
        todo.list.push(task);
    }
  
  return {
      taskTypes: taskTypes,
      addToDo: addToDo,
      todo: todo

  };
});
