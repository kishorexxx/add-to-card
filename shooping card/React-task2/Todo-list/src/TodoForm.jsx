import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function TodoForm(props) {
  const[tasks,setTasks]=useState([
    {task:"Office Task1",description:"My First Task" ,status: 'NotCompleted' },
    {task: "Office Task2 ", description : "My Second Task",status: 'Completed'},
    {task: "Office Task3 ", description : "My Third Task",status: 'Not Completed'}]);
  
  const[newTask,setNewTask]=useState('');
  const[newDescription,setNewDescription]=useState('');
  const[editedIndex,setEditedIndex]=useState(null);
  const[statusFilter,setStatusFilter]=useState('all');//all,completed,notcompleted
  

  //Add Task
  const addTask=()=>{
    //console.log("Addtask!!!");
    if(newTask.trim()!==''){
      const taskObj={
        task:newTask,
        description:newDescription
        
      };
      setTasks([...tasks,taskObj]);
      setNewTask('');
      setNewDescription('');   
    }
  };

  //Delete Task
  const deleteTask=(index)=>{
    const updatedTasks=tasks.filter((_,i)=>i!==index);
    setTasks(updatedTasks);
  };

  //edit Task
  const editTask=(index)=>{
    setEditedIndex(index);
    setNewTask(tasks[index].task);
    setNewDescription(tasks[index].description);
  };
 //save Afteredit
  const savedEditedTask=()=>{
    if(editedIndex!==null){
      const updatedTasks=[...tasks];
     updatedTasks[editedIndex]={
      task:newTask,
      description:newDescription}
      setTasks(updatedTasks);
      setEditedIndex(null);
      setNewTask('');
      setNewDescription('');

     }
    };

  //changeStatus
const changeStatus=(index,completed)=>{
  const updatedTasks=[...tasks];
  updatedTasks[index].completed=completed;
  setTasks(updatedTasks);
  
};
const applyStatusFilter=(status)=>{
  setStatusFilter(status);
};
const filteredTasks=tasks.filter((task)=>{
  if(statusFilter==='completed'){
    return task.completed;
  }else if(statusFilter==='not-completed'){
    return !task.completed;
  }
  return true;
});

  return (

    <div className="container mt-4">
      <p>My To_Do List</p>
      <div className='mb-3'>
        <input type="text" className="form-control" placeholder='Todoname' value={newTask}
        onChange={(event)=>setNewTask(event.target.value)}
        />
      </div>

      <div className='mb-3'>
        <input type="text" className="form-control" placeholder='Tododesc' value={newDescription}
        onChange={(event)=>setNewDescription(event.target.value)}
        />
      </div>
      {editedIndex!==null?(<button className='btn btn-primary mb-3' onClick={savedEditedTask}>Save Edited Task</button>):(<button className="btn btn-success mb-3" onClick={addTask}>AddToDo</button>)}
      

  <div><p id="text">Mytodos</p> </div> <div><p id="dropdown"><abel>Status Filter: </abel>
  <select><option value="all">All</option>
  <option value="Completed">Completed</option>
  <option value="notcompleted">Not Completed</option>
  </select></p>
  </div>


     <div className="row">
      {tasks.map((taskObj,index)=>(
        <div key={index} className='col-md-6'>
          <div className="card ">
            <div className="card-body">
              <p className="card-text">Name: {taskObj.task}</p>
              <p className="card-text">Description: {taskObj.description}</p>
              
              <div className='dropdown'>
                <button className='btn btn-secondary dropdown-toggle' data-toggle ='dropdown'>
                  Status: {taskObj.status}</button>
                  <div className='dropdown-menu'>
                    <button className='dropdown-item ' onClick={()=>changeStatus(index,true)}>Completed</button>
                    <button className='dropdown-item 'onClick={()=>changeStatus(index,false)}>Not Completed</button>
                    </div></div>
                
                </div>
              {editedIndex===index?(<><button className='btn btn-success btn-small' onClick={savedEditedTask}>Save</button>
              <button className='btn btn-secondary btn-small' onClick={()=>setEditedIndex(null)}>Cancel</button>
              </>):(<>
              <button className='btn btn-primary btn-small-edit ' onClick={()=>editTask(index)}>Edit</button>
              <button className='btn btn-danger btn-small-delete ' onClick={()=>deleteTask(index)}>Delete</button>
              </>)}
             
            </div></div>
      ))}
     </div>
    </div>
  );
}

export default TodoForm