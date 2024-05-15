import { ErrorHandler } from "./errorMiddlewares.js";

 import jwt from "jsonwebtoken"
import {User} from "../models/userSchema.js"

 export const isAdminAuthentication = async(req, res, next) => {
    const tokan = req.cookies.adminToken;
    if(!tokan){
        return next(new ErrorHandler("Admin Not Authenticated", 400))
    }
    const decode = jwt.verify(tokan, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);
    if(req.user.role !== "Admin"){
        return next(
            new ErrorHandler(
                `${req.user.role} not authorized for this resources`, 403
            )
        )
        
    }
    next()
 }

 export const ispatientAuthentication = async(req, res, next) => {
    const tokan = req.cookies.patientToken;
    if(!tokan){
        return next(new  ErrorHandler("patient Not Authenticated", 400))
    }
    const decode = jwt.verify(tokan, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);
    if(req.user.role !== "patient"){
        return next(
            new ErrorHandler(
                `${req.user.role} not authorized for this resources`, 403
            )
        )
        
    }
    next()
 }