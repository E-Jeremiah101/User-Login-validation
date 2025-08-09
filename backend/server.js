import express from "express";
import { connectToDB } from "./config/db.js";
import dotenv from "dotenv";
import User from "./models/user.model.js";

dotenv.config();

const app =  express();

const PORT = 5000;

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!")
});

app.post("/api/signup", async (req, res) => {
    const {fullname, username, email, password} = req.body;

    try{
       if(!fullname || !username || !email || password){

       }

       const emailExists = await User.findOne({email});

       if(emailExists){
        return res.status(400).json({messsage: "User already exists."})
       }


       const usernameExists = await User.findOne({username});

       if(usernameExists){
        return res.status(400).json({messsage: "Username is taken"})
       }
    }catch (error){

    }
})

app.listen(PORT, () => {
    connectToDB();
    console.log("Server running on ", PORT);
})