import { useEffect, useState } from "react";
import React from "react";
function App3(){
    const[tasks,setTasks]=useState([]);
    const[task,setTask]=useState("");
    const[filter,setFilter]=useState("all");
    useEffect(()=>{
     const savedTasks=JSON.parse(localStorage.getItem('tasks'))||[];
    setTasks(savedTasks);
    },[]);
    useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
    },[tasks])
    const handleInputChange =(event)=>{
    setTask(event.target.value)
    };
    const handleAddTask = ()=>{
        if (task.trim()!==""){
            setTasks([...tasks,{text:task,completed:false}]);
            setTask("");
        }
    };
    const handleDeleteTask=(index)=>{
        const newTasks=tasks.filter((_,i)=>i!==index);
        setTasks(newTasks);
    };
    const handleToggleComplete =(index)=>{
        const newTasks=tasks.map((t,i)=>i===index?{...t,completed:!t.completed}:t)
    setTasks(newTasks);
    };
    const handleEditTask=(index,newText)=>{
        const newTasks=tasks.map((t,i)=>i===index?{...t,text:newText}:t);
    setTasks(newTasks);
    };
    const filteredTasks=tasks.filter(task=>{
        if(filter=="completed") return task.completed;
        if(filter=="pending") return !task.completed;
        return true;
    })
    
    return (
        <div className="App"> 
        <h1>to do list</h1>
            <div
            className="input-container">
                <input 
                type="text"
                onChange={handleInputChange}
                value={task}
                placeholder="enter a task"/>
                <button onClick={handleAddTask}>
                    add a task
                </button>
            </div>
            <div className="filter-container">
                <button onClick={()=>setFilter("all")}>all</button>
                <button onClick={()=>setFilter("completed")}>completed</button>
                <button onClick={()=>setFilter("pending")}> pending</button>

            </div>
            <ul>
                {  filteredTasks.map((task,index)=>(
                
                <li key={index}>
                    <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={()=>handleToggleComplete(index)}
                    />
                    {task.completed?(
                    <s>{task.text}</s>
                    ):(
                    <span>{task.text}</span>
                    ) }
                  
                    {task}
                    <button 
                    onClick={()=>{
                    const newText=prompt("edit the task:",task.text);
                    if (newText) handleEditTask(index,newText)
                    }}>
                        edit</button>
                    <button onClick={handleDeleteTask(index)}>delete</button>
                </li>
                ))}

            </ul>

        </div>
    )

}
export default App3