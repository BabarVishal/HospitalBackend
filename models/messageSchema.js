import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true,
        minLength: [3, "First Name must be cantein at list 3 characters"]
    },
    lastName:{
        type: String,
        require: true,
        minLength: [3, " last Name must be cantein at list 3 characters"]
    },
    email:{
        type: String,
        require: true,
        validator: [validator.isEmail, "please provide a valid Email"]
    },
    phone:{
        type: String,
        require: true,
        minLength: [10, "Phone Number Must Contain Exact 11 Digits"]
    },
    message:{
        type: String,
        require: true,
        minLength: [11, "message Must Contain Exact 11 charecter"]
    }
})

export const  messageDeta = mongoose.model("messageDeta", messageSchema);