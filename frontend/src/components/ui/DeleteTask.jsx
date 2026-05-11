import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import clsx from "clsx";
import { X } from "lucide-react";
import TaskList from "../TaskList";
import deleteTaskAPI from "../api/deleteTask";
import Info from "../../assets/info.svg"

const DeleteTask = ({isOpen, onClose, task, fetchAllTasks}) => {
  const [loading, setLoading] = useState(false);

  const handleResponse = useCallback(() => {
    fetchAllTasks();
    onClose();
  }, []);

  const handleError = useCallback((errorMsg) => {
    console.error(errorMsg);
    alert(errorMsg);
  }, []);

  const deleteTask = useCallback(() => {
    deleteTaskAPI(task._id, handleResponse, handleError, setLoading);
  }, [handleResponse, handleError, task._id]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="delete-task-container">
        <div className="text-right delete-task-header">
          <img src={Info} alt="info-icon" className="delete-popup-info-icon" />
          <div className="close-modal-btn">
            <X style={{ color: "black" }} onClick={onClose} />
          </div>
        </div>

        <div className="delete-popup-content">
          <p className="delete-task-text">
            Are you Sure you want to delete? <br />
            <span className="delete-task-title">{task.title}</span>
          </p>

          <div className="delete-action-btns">
            <button className="btn cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              className={clsx(
                "btn",
                "delete-btn",
                loading && "disabled-delete-btn"
              )}
              onClick={deleteTask}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTask;
