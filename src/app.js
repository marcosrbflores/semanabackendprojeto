import express from 'express';
import dotenv from 'dotenv';
import Task from './models/TaskModel.js'
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
const mongoDBSTR = process.env.MONGODB_URI


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(port, () => {
            console.log('O servidor está rodando na porta', port);
        })
    })
    .catch(err => {
        console.log('Erro ao conectar ao MongoDB:', err);
    });

app.use(express.json());

app.get('/ping', (req,res) => {
    res.json({ message: 'pong' });
})

app.post('/tasks', async (req,res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/tasks', async (req,res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error){
        res.status(500).send(error);
    }
})

app.get('/tasks/:id', async (req,res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

app.put('/tasks/:id', async (req,res) => {
    try {
        const atualizacoes = Object.keys(req.body);
        const atualizacoesPermitidas = ['titulo', 'descricao', 'concluida'];
        const operacaoValida = atualizacoes.every(atualizacoes => atualizacoesPermitidas.includes(update));

        if (!operacaoValida){
            return res.status(500).send({error:'Atualização Inválida!'});
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

app.delete('/tasks/:id', async (req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
    } catch (error) {
        res.status(500).send(error);
    }
})