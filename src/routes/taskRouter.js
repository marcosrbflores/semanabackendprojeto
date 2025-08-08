import express from "express"
import Task from  "../models/taskModel.js"

const router = express.Router();



router.get("/", async (req, res) =>
{
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})



router.post("/", async (req,res) =>
{
    const { title, description, dueDate, completed } = req.body;
    try{
        const newTask = new Task({ title, description, dueDate, completed });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
        })
    

router.patch("/:id", async (req,res) =>
    {
        const id = req.params.id;
        
        const { title, description, dueDate, completed } = req.body;    
       
        try 
        {
            
            const updatedTask = await Task.findByIdAndUpdate(id, { title, description, dueDate, completed }, { new: true });
            
            if (!updatedTask) {
                return res.status(404).json({ error: "Task not found" });
            }
            res.status(200).json(updatedTask);
        }

        catch (error) {
            res.status(400).json({ error: error.message });
        }
    })

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try
    {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" }); 
    }
    catch(error)
    {
        res.status(400).json({ error: error.message });
    }


})

export default router;