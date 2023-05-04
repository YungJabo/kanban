import { useState, useEffect } from "react";
import plus from "./img/plus.png";
import close from "./img/close.png";
import {v4 as uuidv4} from "uuid"; 
function Top({ onAddTask, selectedTask,  setSelectedTask}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const time = document.querySelector('.task__time');
  const name = document.querySelector('.task__name');
  
  

  const handleButtonClick = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

 

  
  
  const addNewTask = () =>{
    const name = document.querySelector('.task__name').value;
    const time = document.querySelector('.task__time').value;
    if(name.trim()==""){
        document.querySelector('.modal__txt').innerHTML = 'An empty field!';
    }
    else{
      document.querySelector('.modal__txt').innerHTML = 'Enter new Task:';
      const newTask = {id:uuidv4(),  title: name, time: time, status: "New", priority: 1 };
      onAddTask(newTask);
      closeModal(); 
    }
    

  }

  

  return (
    <div className="top">
      <button className="add__btn" onClick={handleButtonClick}>
        <img src={plus} className="plus__img" />
        Add new
      </button>
      <div className={`modal ${isModalOpen ? "" : "hidden"}`}>
        <div
          className="modal__container"
          style={{ display: isModalOpen ? "flex" : "none" }}
        >
          <button className="close__btn" onClick={closeModal}>
            <img src={close} alt="" className="close__img" />
          </button>
          <div className="modal__txt">Enter new Task:</div>
          <input type="text" className="task__name" />
          <div className="modal__txt">Enter the time:</div>
          <input type="time" className="task__time" />
          <button className="add__btn" onClick={addNewTask}>
            <img src={plus} className="plus__img" />
            Add
          </button>
        </div>
      </div>

      

      

      
      

    </div>
  );
}
export default Top;
