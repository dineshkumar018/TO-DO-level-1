import express from "express";
import cors from "cors";
import "dotenv/config";
import db from "./src/utils/db.js";
import router from "./src/routes/taskRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db()
  .then(() => {
    
    app.use("/api/v1/task", router);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed. Server not started.", error);
  });
