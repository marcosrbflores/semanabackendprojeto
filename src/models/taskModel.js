import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String
    },
    dueDate: {
        type: Date
    },

    completed: {
        type: Boolean
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    }
})



export default mongoose.model("Task", taskSchema);