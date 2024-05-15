import {messageDeta } from "../models/messageSchema.js";


export const sendMassage = 
   async (req, res) =>{
      const { firstName, lastName, email, phone,  message} = req.body;
     
      if(!(firstName || lastName || email|| phone || message)){
         return res.status(400).json({
             success: false,
             message : "Please Fill Full Form"
         })
      };
     
      await messageDeta.create({ firstName, lastName, email, phone,  message});
      res.status(200).json({
         success: true,
         message: "Message send SuccessFully"
      });
     
     }


