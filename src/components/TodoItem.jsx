import React from 'react';


export  function TodoItem({todo, toggleTodo}) {
    
  const  {id, task, completed} = todo

  const handleTodoClick = () =>{
    toggleTodo(id);
  };
  return <li><input type= "checkbox" onChange={handleTodoClick}/> 
             {task}
        </li>;
}
