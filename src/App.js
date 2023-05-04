//kanban statuses
import React, { useEffect, useState } from "react";
import Column from "./Column";
import { addTask } from "./AddTask";
import Top from "./Top";

const taskStatuses = ["New", "Sheduled", "Progress", "Completed"];
const initialTasks = [
  
  
];

function App() {
  
  
  
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || initialTasks;
  const [tasks, setTasks] = useState(storedTasks);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  

  const handleAddTask = (newTask) => {
    const updateTasks = addTask(tasks, newTask);
    setTasks(updateTasks);
  };

  const handleTaskDelete = (taskId)=>{
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  const handleEditTask = (updatedTask)=>{
    const updatedTasks = tasks.map((task)=> task.id === updatedTask.id ? updatedTask : task);
    setTasks(updatedTasks);
  }

 
  return (
    <div className="App">
      <div className="board">
        <Top onAddTask={handleAddTask}></Top>
        <div className="columns">
          <Column tasks={tasks} status="New" onTaskDelete={handleTaskDelete} onTaskEdit={handleEditTask}></Column>
          <Column tasks={tasks} status="Sheduled" onTaskDelete={handleTaskDelete} ></Column>
          <Column tasks={tasks} status="Progress" onTaskDelete={handleTaskDelete}></Column>
          <Column tasks={tasks} status="Completed" onTaskDelete={handleTaskDelete} ></Column>
        </div>
      </div>
    </div>
  );

  
}

export default App;
