import {User} from "../models/userSchema.js"
import {generateTokan} from "../utils/jwtTokan.js"

export const patientRegister = async (req, res) =>{
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role,
        doctorDepartment,
        docAvatar
    } = req.body;

    if(!(
        firstName     ||
        lastName||
        email||
        phone||
        nic||
        dob||
        gender||
        password||
        role||
        doctorDepartment||
        docAvatar
    )){
        return res.status(400).json({mes:"Plese Fill The All Deta!"})
    }
   
  const user =  await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role,
        doctorDepartment,
        docAvatar
 });
generateTokan(user, "User Creted Succesfully", 200, res)
//  res.status(200).json({mes: "User Creted Succesfully!"});
}


export const login = async (req,res) =>{
    const {email, password} = req.body;
    if(!(email || password)){
        return res.status(400).json({mes:"Plese Fill the Carect Deta!"});
    }

    const user = await User.findOne({email});
    if(!user){
        res.status(400),json({
            mes:"Invalid Deta!"
        })
    }else{

        generateTokan(user, "User login Succesfully", 200, res)
        // res.status(200).json({
        //     mes:"You are LogIn now!",
        //     user:{
        //         email: email,
        //         password: password
        //     }
        // })
    }
}

export const addNewAdmin = async(req, res, next) =>{
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password
    } = req.body;

    if(!(
        firstName     ||
        lastName||
        email||
        phone||
        nic||
        dob||
        gender||
        password 
    )){
        return res.status(400).json({mes:"Plese Fill The All Deta!"})
    }

    const isRegister = await User.findOne({email});
   if(!isRegister){
    res.status(400).json({
        mes:"User is not define"
    })
   }

   const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password
   })
   generateTokan(admin, "new admin Succesfully", 200, res)
}

export const getAllDocter = async(req, res, next) =>{
    const docter = await User.find({role: "Docter"});
    if(!docter){
      res.status(200).json({
        mes:"Docter Deta is Empty!"
      })
    }
    res.status(200).json({
        success: true,
        docter
    })
}

export const getalluser = async (req, res, next) =>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    })
}

export const logoutAdmin = (req, res, next) =>{
    res.status(200).cookie("adminTokan", "",{
        httpOnly:true,
        expire:new Date(Date.now()),
    }).json({
        success:true,
        mes: "User log out Successfully"
    })
}