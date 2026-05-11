import React, { useCallback, useState } from 'react'
import InputField from './ui/InputField'
import UserIcon from '../assets/user-icon.png'
import TitleImg from '../assets/title-placeholder-img.svg'
import Memo from '../assets/memo.svg'
import clsx from 'clsx'
import Calender from '../assets/calendar.svg'
import createTaskAPI from './api/createTask.js'


const CreateTask = ({showTaskListScreen, fetchAllTasks}) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDueDate, setDueDate] = useState();
    const [loading, setLoading] = useState(false);

    const handleTitleChange = useCallback(function(event){
        setTaskTitle(event.target.value)
    },[])

    const handleDescriptionChange = useCallback(function(event){
        setTaskDescription(event.target.value)
    },[])

    const handleDateChange = useCallback(function(date){
        setDueDate(date)
    },[])

    const validate = useCallback(function(values){
        const {taskTitle,taskDescription} = values;
        if(taskTitle && taskDescription){
            return true;
        }
        else{
            const errorMsg = "Please fill the title or description";
            console.log(errorMsg);
            return false;
        }
    },[])

    const handleResponse = useCallback(function(responseData){
        console.log(responseData)
        if(responseData.success){
            console.log("handle successfully");
            fetchAllTasks();
        }
    },[])

    const handleError = useCallback((errorMsg) => {
        alert(errorMsg);
        console.log(errorMsg)
    },[])

    const createNewTask = useCallback(function(values){
        createTaskAPI(values, handleResponse, handleError, setLoading)
    },[handleError,handleResponse])

    const handleAddTask = useCallback(function(){
        const values = {
            taskTitle,
            taskDescription,
            taskDueDate: taskDueDate ? new Date(taskDueDate) : null,
        }
        const isValid = validate(values);
        if(isValid) createNewTask(values)
    },[createNewTask, taskDescription, taskTitle,taskDueDate,validate])

  return (
    <div className='content-section create-task-section'>
        <div className="create-task-card">
            <img src={UserIcon} width={263}/>
            <h1 className="create-task-title-text">Create New Task</h1>
            <InputField
            name={"new-task-title"}
            value={taskTitle}
            onChange={handleTitleChange}
            label={"Title"}
            type={"text"}
            inputImg={TitleImg}
            placeholder={"Title"}
            className={"input-margin"}
            />

            <InputField
            name={"new-task-decription"}
            value={taskDescription}
            onChange={handleDescriptionChange}
            label={"Description"}
            type={"text"}
            inputImg={Memo}
            placeholder={"Description"}
            className={"input-margin"}
            />

            <InputField
            name={"new-task-due-date"}
            value={taskDueDate}
            onChange={handleDateChange}
            label={"Due Date"}
            type={"date"}
            inputImg={Calender}
            placeholder={"Due Date"}
            className={"input-margin"}
            />
            <div className="add-edit-task-btns">
                <button className={clsx("btn","add-task-btn", loading ? "disabled-add-task-btn" : "cursor-pointer")} disabled={loading} onClick={handleAddTask}>{loading ? "Adding Task": "Add Task"}</button>
                <button className='btn cancel-btn cursor-pointer' onClick={showTaskListScreen}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default CreateTask