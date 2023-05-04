import { useEffect, useRef, useState } from "react";
import close from "./img/close.png";
import edit from "./img/edit.png";

function Column(props) {
  const colors = [
    "#26992661",
    "#245a7a61",
    "#ff780061",
    "#a61a0060",
    "#13890061",
    "#77207d60",
  ];

  const { tasks, status, onTaskDelete, onTaskEdit } = props;


  const filteredTasks = tasks.filter((task) => task.status === status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newName,setNewName] = useState("");
  const [newTime,setNewTime] = useState("");
  const inputNameRef = useRef();
  const inputTimeRef = useRef();
  
  

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleTaskDelete = (taskId) => {
    onTaskDelete(taskId);
  };

  const updateTask = () => {
    const newName = inputNameRef.current.value;
    const newTime = inputTimeRef.current.value;
    const updatedTask = { ...selectedTask, title: newName, time: newTime };
    console.log(updatedTask);
    onTaskEdit(updatedTask);
    setSelectedTask(null);
    inputNameRef.current.value="";
    inputTimeRef.current.value="";
    closeModal();
  };
  const handleTaskEdit = (taskId) => {
    openModal();
    const editTask = tasks.find((task) => task.id === taskId);
    setSelectedTask(editTask);
  };

  useEffect(()=>{
      if(selectedTask && selectedTask.title){
        setNewName(selectedTask.title);
        setNewTime(selectedTask.time);
      }
  }, [selectedTask]);

  useEffect(()=>{
    inputNameRef.current.value = newName;
    inputTimeRef.current.value = newTime;
  },[newName,newTime]);


  return (
    <div className="board">
      <div className={`modal ${isModalOpen ? "" : "hidden"}`}>
        <div
          className="modal__container"
          style={{ display: isModalOpen ? "flex" : "none" }}
        >
          <button className="close__btn" onClick={closeModal}>
            <img src={close} alt="" className="close__img" />
          </button>
          <div className="modal__txt">Edit the Task:</div>
          <input type="text" className="task__name" ref={inputNameRef}/>
          <div className="modal__txt">Edit the time:</div>
          <input type="time" className="task__time" ref={inputTimeRef}/>
          <button className="add__btn" onClick={(e) => updateTask()}>
            Confirm
          </button>
        </div>
      </div>
      <div className="column">
        <div className="column__name">{status}</div>
        <hr></hr>
        {filteredTasks.map((task) => (
          <div
            className="task"
            key={task.id}
            style={{
              backgroundColor:
                task.status === "Completed"
                  ? "#3a353b60"
                  : colors[Math.floor(Math.random() * colors.length)],
              opacity: task.status === "Completed" ? "0.4" : "1",
            }}
          >
            <button className="close__btn close__btn__card">
              <img
                src={close}
                alt=""
                className="close__img"
                onClick={() => handleTaskDelete(task.id)}
              />
            </button>
            <button className="close__btn edit__btn">
              <img
                src={edit}
                alt=""
                className="edit__img"
                onClick={() => handleTaskEdit(task.id)}
              />
            </button>
            <h3
              style={{
                textDecoration:
                  task.status === "Completed" ? "line-through" : "none",
              }}
            >
              {task.title}
            </h3>
            <p>{task.status}</p>
            <p>{task.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
