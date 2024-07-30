import React, { useState } from "react";
import './App.css'

function App(){
    const[tasks,setTasks]=useState([])
    const[task,setTask]=useState("")
    const handleInputChange = (event) =>{
    setTask(event.target.value)
    }
    const handleAddTask = () =>{
        if(task.trim()!==""){
            setTasks([...tasks,task]);
            setTask("");
        }

    }
    const handleDeleteTask = (index)=>{
        const newTasks=tasks.filter((_,i)=>i!==index);
        setTasks(newTasks);
    }
    return(
        <div
        className="App">
            <h1>Todo List</h1>
            <div
            className="input-conatiner">
            <input
            type="text"
            value={task}
            onChange={handleInputChange}
            placeholder="enter a task"/>
            <button 
            onClick={handleAddTask}
            >add Task</button>
            </div>
            <ul>
              {  tasks.map((task,index)=>(
                <li key={index}>
                    {task}
                <button onClick={()=>handleDeleteTask(index)}>delete</button>
                </li>
              ))}
            </ul>

        </div>

    )
}
export default App;





