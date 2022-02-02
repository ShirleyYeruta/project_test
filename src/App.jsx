import React, {Fragment,useState, useRef, useEffect} from "react";
import { TodoList } from "./components/TodoList";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";



export function App(){

    

    const[todos, setTodos]= useState([{id: 1, task: 'Tarea_1', completed:false}])
    
    const todoTaskRef = useRef();
    // USeEffect para almacenar los datos de las tareas por lo tanto se usa el local storage
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('key'));
        if (storedTodos){
            setTodos(storedTodos);
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem('key', JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id) => {
        const newTodos = [...todos];  
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed =! todo.completed;
        setTodos(newTodos);
    };

    const { v4: uuidv4 } = require('uuid');

    const handleTodoAdd = () =>{
        const task = todoTaskRef.current.value;
        if (task === '') return;
        setTodos(prevTodos =>{
            return [...prevTodos, {id: uuidv4(),task,completed:false}];
    
        });
        todoTaskRef.current.value = null;
    };
    
    const handleClearAll = () =>{
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    }

    

    return (
    
        <Fragment>
            <Button variant="contained" color="secondary"> btnTest</Button>
           
       
            <TodoList  todos={todos} toggleTodo={toggleTodo}/>
            <input ref={todoTaskRef} type="text" placeholder="Nueva tareita..."/>
            <button onClick={handleTodoAdd}>➕</button>
            <button onClick={handleClearAll}>🗑️</button>
            <DeleteIcon color="primary" fontSize="large" />
            <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar </div>
        </Fragment>
        );
   
}