import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        descricao: {
            type: String
        },
        concluida: {
            type: Boolean,
            default: false
        }
    },{
        timestamps: true
    }
)

const Task = mongoose.model('Task', TaskSchema);

export default Task;