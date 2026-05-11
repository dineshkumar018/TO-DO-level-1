import Task from "../models/taskmodels.js";

const newTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and Description not found" });
    }

    const newTask = await Task.create({ title, description, due_date });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    console.log("UPDATE BODY:", req.body);
    const { id } = req.params;

    const { title, description, due_date } = req.body;

    if (!id) {
     return res.status(400).json({
        message: "Task id not Matches",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, due_date: due_date || null },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      task: updatedTask,
      message: "task updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Updating Task failed",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
     return res.status(400).json({
        message: "Task id not Matches",
      });
    }
    const deletedTask = await Task.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};

export { newTask, getTasks, updateTask, deleteTask };
