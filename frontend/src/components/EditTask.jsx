import { Calendar } from "lucide-react";
import React, { useCallback, useState } from "react";
import InputField from "./ui/InputField";
import clsx from "clsx";
import TitleImg from "../assets/title-placeholder-img.svg"
import Memo from "../assets/memo.svg"
import updateTaskAPI from "./api/updateTask"
import EditTaskImg from "../assets/edit-task-logo.svg"
import Calender from "../assets/calendar.svg";



const EditTask = ({ task, showTaskListScreen, fetchAllTasks }) => {
    const [loading, setLoading] = useState(false);

  const [taskTitle, setTaskTitle] = useState(task.title ?? "");
  const [taskDescription, setTaskDescription] = useState(
    task.Description ?? ""
  );
  const [taskDueDate, setTaskDueDate] = useState(
    task.due_date ? new Date(task.due_date) : undefined
  );

  const handleTitleChange = useCallback(function (e) {
    setTaskTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback(function (e) {
    setTaskDescription(e.target.value);
  }, []);

  const handleDateChange = useCallback(function (date) {
    setTaskDueDate(date);
  });

  //Validation

  const validate = useCallback(function (values) {
    const { taskTitle, taskDescription } = values;
    if (taskTitle && taskDescription) {
      return true;
    } else {
      const errorMsg = "please fill out the title and description";
      console.error(errorMsg);
      return false;
    }
  }, []);

  const handleResponse = useCallback(function (responseData) {
    if (responseData.success) {
      console.log("Handled Successfully");
      fetchAllTasks()
    }
  }, []);

  const handleError = useCallback(function (errorMsg) {
    alert(errorMsg);
    console.error(errorMsg);
  }, []);

  const editTask = useCallback(
    function (values, taskId) {
      updateTaskAPI(values, taskId, handleResponse, handleError, setLoading);
    },
    [handleError, handleResponse]
  );

  const handleEditTask = useCallback(
    function () {
      const values = { taskTitle, taskDescription, taskDueDate };
      const isValid = validate(values);
      if (isValid) editTask(values, task._id);
    },
    [editTask, task._id, taskDescription, taskTitle, taskDueDate]
  );

  return (
    <div className="create-task-section">
      <div className="create-task-card">
        <img src={EditTaskImg} alt="Edit task" width={263} />
        <h1 className="create-task-title-text">Edit Task</h1>

        {/* {Custom Input Field for title} */}
        <InputField
          name="edit-task-title"
          value={taskTitle}
          onChange={handleTitleChange}
          label="Title"
          type="text"
          inputImg={TitleImg}
          placeholder="Title"
        />

        {/* {Custom Input Field for description} */}
        <InputField
          name="edit-task-description"
          value={taskDescription}
          onChange={handleDescriptionChange}
          label="Description"
          type="textarea"
          inputImg={Memo}
          placeholder="Description"
          className="input-margin"
        />

        {/* {Custom Input Field for due date} */}
        <InputField
          name="edit-task-due-date"
          value={taskDueDate}
          onChange={handleDateChange}
          label="Due date"
          type="date"
          inputImg={Calender}
          placeholder="Due Date"
          className="input-margin"
        />

        <div className="add-edit-task-btns">
          <button
            className={clsx(
              "btn",
              "edit-task-btn",
              loading ? "disabled-delete-btn" : "cursor-pointer"
            )}
            disabled={loading}
            onClick={handleEditTask}
          >
            {loading ? "saving" : "save"}
          </button>
          <button
            className="btn cancel-btn cursor-pointer"
            onClick={showTaskListScreen}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
