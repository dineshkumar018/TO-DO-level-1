import React, { useCallback, useEffect, useState } from "react";
import Loading from "../components/ui/Loading";
import fetchTaskAPI from "../components/api/fetchTask.js";
import TaskList from "./TaskList.jsx";
import CreateTask from "./CreateTask.jsx";
import NoTask from "./NoTask.jsx";
import ViewTask from "./ViewTask.jsx";
import EditTask from "./EditTask.jsx";

const TaskMain = () => {
  const [currComponent, setCurrComponent] = useState("loading");
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState();

  const showNoTaskScreen = useCallback(function () {
    setCurrComponent("noTask");
  }, []);

  const showCreateTaskScreen = useCallback(function () {
    setCurrComponent("createTask");
  }, []);

  const showTaskListScreen = useCallback(function () {
    setCurrComponent("taskList");
  }, []);

  const showEditTaskScreen = useCallback(function () {
    setCurrComponent("editTask");
  }, []);

  const showViewTaskScreen = useCallback(function () {
    setCurrComponent("viewTask");
  }, []);

  const handleResponse = useCallback(
    function (responseData) {
      const extractedTasks = responseData.tasks;
      setTasks(extractedTasks);
      if (extractedTasks.length) {
        showTaskListScreen();
      } else {
        showNoTaskScreen();
      }
    },
    [showTaskListScreen, showNoTaskScreen]
  );

  const handleError = useCallback(function (errorMsg) {
    alert(errorMsg);
    console.error(errorMsg);
  }, []);

  const fetchAllTasks = useCallback(
    function () {
      fetchTaskAPI(handleResponse, handleError);
    },
    [handleResponse, handleError]
  );

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  return (
    <>
      {currComponent === "loading" && <Loading />}
      <div id="container-div">
        {currComponent === "noTask" && (
          <NoTask showCreateTaskScreen={showCreateTaskScreen} />
        )}
        {currComponent === "taskList" && (
          <TaskList
            tasks={tasks}
            showCreateTaskScreen={showCreateTaskScreen}
            showEditTaskScreen={showEditTaskScreen}
            showViewTaskScreen={showViewTaskScreen}
            setActiveTask={setActiveTask}
            fetchAllTasks={fetchAllTasks}
          />
        )}
        {currComponent === "createTask" && (
          <CreateTask
            showTaskListScreen={showTaskListScreen}
            fetchAllTasks={fetchAllTasks}
          />
        )}
        {currComponent === "viewTask" && (
          <ViewTask
            task={activeTask}
            showTaskListScreen={showTaskListScreen}
            setActiveTask={setActiveTask}
            showEditTaskScreen={showEditTaskScreen}
            fetchAllTasks={fetchAllTasks}
          />
        )}
        {currComponent === "editTask" && (
          <EditTask
            task={activeTask}
            showTaskListScreen={showTaskListScreen}
            fetchAllTasks={fetchAllTasks}
          />
        )}
      </div>
    </>
  );
};

export default TaskMain;
