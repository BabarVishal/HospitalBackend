import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const saltRounds = 10;
const myPlaintextPassword = 'myPassword';

const userSchema = new mongoose.Schema({
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
        minLength: [10, "Phone Number Must Contain Exact 11 Digits"],
        maxLength: [11, "Phone number must canten Extact 11 digits!"]
    },
    nic:{
        type: String,
        require: true,
        minLength: [13, "NIC Must Canten Extact 13 Digits!"],
        maxLength: [13, "NIC Must Canten Extact 13 Digits!"]
    },
    dob:{
        type: Date,
        require: [true, "DOB is REquire"],
    },
    gender:{
        type: String,
        require: true,
        enum: ["Male", "Female"]
    },
    password:{
        type: String,
        require: true,
        select: false,
        minLength: [10, "Password Must Canten Extact 10 Digits!"],
    },
    role:{
        type: String,
        require:true,
        enum: ["Admin", "patient", "Doctor"]
    },
    doctorDepartment:{
        type: String
    },
    docAvatar:{
        public_id :String,
        url: String
    }
});

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      // Store hash in your password DB.
      console.log(hash);
    }
  });

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateJsonWebToken = function() {
    const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';
    
    const expiresIn = process.env.JWT_EXPIRES || '1d';
  
    return jwt.sign({ id: this._id }, secretKey, { expiresIn });
  };

export const  User  = mongoose.model("User ", userSchema );