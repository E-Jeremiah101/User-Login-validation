import express from "express";
import { connectToDB } from "./config/db.js";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
        return res.status(400).json({messsage: "Username is taken, try another name"})
       };
       
      //encrypt user password
       const hashedPassword = await bcryptjs.hash(password, 10);

     //create user documet/details
       const userDoc =  await User.create({
        fullname,
        username,
        email,
        password: hashedPassword,
       })

       //implement jwt
       JWT_SECRET = jesusmylove;

       if(userDoc){
        const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET, {
            expiresIn: "5d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 100,
        })
       }

       return res.status(200).json({user:userDoc, message: "User created successfully!"})
    }catch (error){
      res.status(400).json({message: error.message})
    }
})

app.listen(PORT, () => {
    connectToDB();
    console.log("Server running on ", PORT);
})