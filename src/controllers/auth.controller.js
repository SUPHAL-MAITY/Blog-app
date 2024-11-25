import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"

import { User } from "../models/user.model.js";




const registerController=asyncHandler(async(req,res)=>{



     ///take the input
    /// validation
    ///// check user
    ///// hashing password(method mentioned in userSchema already)
    //// create user
    //check registered or not
    //return res


    const {name,email,role,password}=req.body;

    if([name,email,role,password].some((value)=>value?.trim()==="")){
        throw new ApiError(400,"All fields are necessary while registering")
    }

    const existingUser=await User.findOne({email})
    if(existingUser){
        throw new ApiError(400,"users already exists")

    }

    const user=await User.create({
        name,email,role,password
    })


    const createdUser=await User.findOne({_id:user._id}).select("-password -refreshToken")

    
   if(!createdUser){
    throw new ApiError(400,"user not created while signing up")
   }

   return res.status(200).json(new ApiResponse(200,"user created successfully",createdUser))




    




})




export {registerController}