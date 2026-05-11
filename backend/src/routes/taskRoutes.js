import express from "express";
import { newTask, getTasks, updateTask, deleteTask } from "../controller/taskcontroller.js";

const router = express.Router();
router.post("/", newTask);
router.get("/", getTasks);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask); 

export default router;
  