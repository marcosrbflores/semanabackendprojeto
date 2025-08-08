import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskRouter from "./routes/taskRouter.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://marcosrogf03:itajunior2025oss@training.o3lgbvl.mongodb.net/";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use("/tasks", taskRouter);


app.get("/ping", (req,res) => {
    res.status(200).json({ message: "pong!" });
})

app.get("/hello/:name", (req, res) => {
    
    const name = req.params.name;
    const message = `Hello, ${name}!`;
    res.status(200).json({ message });
    

})


async function StartServer(){
try {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
} catch (err) {
  console.error("❌ Error connecting to MongoDB:", err);
}

}

StartServer();