import express from "express";
import dotenv from "dotenv";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get("/ping", (req,res) => {
    res.status(200).json({ message: "pong!" });
})


app.get("/hello/:name", (req, res) => {
    
    const name = req.params.name;
    const message = `Hello, ${name}!`;
    res.status(200).json({ message });
    

})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})