import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.get('/ping', (req,res) => {
    res.json({ message: 'pong' });
})

app.get('/hello/:name', (req,res) => {
    const name = req.params.name;
    res.send(`Hello, ${name}!`);
})



app.listen(port, () => {
    console.log('O servidor está rodando na porta', port);
})