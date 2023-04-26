import './App.css';
import React, { useState } from 'react';
import {getTasks,updateTasks} from "./dynamo"

function App(){
  const [username,setUsername] = useState('')
  const [tasks,setTasks] = useState([])
  const [task,setTask] = useState('')
  const usernameChangeHandler= (e) =>{
    setUsername(e)
    console.log(e)
  }
  const isUser = ()=>{
    if(sessionStorage.getItem("username")!==null){
      return true
    }
    return false
  }
  const taskChangeHandler = (e)=>{
    setTask(e)
  }
  const addTask = ()=>{
    if(task!==''){
      setTasks([...tasks,task])
      setTask('')
      // updateTasksDb()
    }
  }
  
  const saveUser = ()=>{
    if (username!==''){
      sessionStorage.setItem("username",username);
      // window.location.reload()
      getTasks(username).then(resp=>{
        if(resp.Item!==undefined){
        setTasks(resp.Item.tasks)
        }
        else{
          setTasks([])
        }
        
      }).catch(err=>console.error(err))
      isUser()
      // console.log(tasks)
    }
  }

  const deleteTask = (index)=>{
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    // updateTasks()
  }
 const updateTasksDb= ()=>{
  if(isUser){
    const username=sessionStorage.getItem("username")
    const obj={
      "userId":username,
      "tasks":tasks
    }
    console.log(obj)
    updateTasks(obj).then(resp=>console.log("Tasks updated")).catch(err=>console.log("Error while updating tasks"))
  }
 }
 const saveTasks=()=>{
  console.log(tasks)
   updateTasksDb()
 }

 const exit=()=>{
    sessionStorage.removeItem("username")
    window.location.reload()
 }

  return(
    <div >
      { !isUser()? 
      <div className='cc'>
      <div className="card text-center custom-card">
         {/* <h2 className="card-title">TODO List</h2> */}
            <input type="text" name="username" className="form-control" value={username} placeholder='username' onChange={(e)=>usernameChangeHandler(e.target.value)}/>
            <button type="button" className="btn btn-primary custom-btn"  onClick={saveUser}>Get Tasks</button>
                 </div>
                 </div>
                 :
                 <div>
                   {
                    tasks.length>0 ?
            <div className="card text-center custom-card-1">
          <div className="card-body ">
          <h2 className="card-title">TODO List</h2>
          <ul className="list-group">
          <li className=" d-flex justify-content-between align-items-center">
           <input type="text" name="username" className="form-control" value={task} onChange={(e)=>taskChangeHandler(e.target.value)}/>
           <button type="button" className="btn btn-primary add-task"  onClick={addTask}>Add</button>
          </li>
          </ul>
    <ul className="list-group lis">
        {tasks.map((todo, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {todo}
            <button className="btn btn-warning" onClick={() => deleteTask(index)}>complete</button>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn-success" onClick={saveTasks}>Save</button>
      <button type="button" className="btn btn-danger exit" onClick={exit}>Exit</button>
                    </div>
                    </div>
                    :
                    <div>
    <div className="card text-center custom-card-1">
        <div className="card-body ">
          <h2 className="card-title">TODO List</h2>
          <div className="mb-3">
          <ul className="list-group">
          <li className=" d-flex justify-content-between align-items-center">
           <input type="text" name="username" className="form-control" value={task} onChange={(e)=>taskChangeHandler(e.target.value)}/>
           <button type="button" className="btn btn-primary add-task"  onClick={addTask}>Add</button>
          </li>
      </ul>
          </div>
          <button type="button" className="btn btn-success" onClick={saveTasks}>Save</button>
          <button type="button" className="btn btn-danger exit" onClick={exit}>Exit</button>
        </div>
      </div>
                    </div>
                   }
                      </div>
      }

    </div>
  );
}
export default App;
