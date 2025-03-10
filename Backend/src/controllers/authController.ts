import { Request, Response } from "express";
import { registerValidation } from "../validators/authValidation";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import Jwt  from "jsonwebtoken";
 


export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { error } = registerValidation.validate(req.body);

    if (error){
       res.status(400).json({ message: error.details[0].message });
       return
    }
      

    //Check if user already exists

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser){
      res.status(400).json({ message: "User already exists" });
    }
 

    //Password hash
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    //save to database
    const newUser = await User.create({ ...req.body, password: hashPassword });
    await newUser.save();

    res.json({ data: "user registered successfully" });
  } catch (error) {
    res.send({ message: "Server error" });
  }
};


export const loginUser = async(req: Request, res: Response): Promise<void> =>{

  try {
   
  
   const user  = await User.findOne({email : req.body.email})

   if(!user){
    res.json({message: "User does not exist"})
    return
   }
 
   const isValid =  await bcrypt.compare(req.body.password, user.password )
            
   if(!isValid){
    res.send({message : "Password does not matched"})
    return
   }
 
   const token =  Jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {
       expiresIn : '1h'
    })
 
    //Store token in cookie
    
    res.cookie('AuthToken', token,{httpOnly: true,  secure: true})
       res.json({message : "Login Successful", token})


  } catch (error) {
   res.status(500).json({error})
  }

}


export const logoutuser = async(req: Request, res: Response): Promise<void> =>{

    res.cookie("AuthToken", " ", {expires: new Date(0)})
    res.json({message : "Loggedout successfully"})

}