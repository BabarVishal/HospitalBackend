import express from "express"
import {sendMassage } from "../Controlles/messageControlles.js"
import {patientRegister, login, addNewAdmin, getAllDocter, getalluser, logoutAdmin  } from "../Controlles/userController.js"
import {isAdminAuthentication, ispatientAuthentication  } from "../middlewares/auth.js"

const router = express.Router();

router.post("/send", sendMassage )

router.post("/Register", patientRegister)

router.post("/login", login)

router.post("/addNew",isAdminAuthentication, addNewAdmin)

router.get("/Docter",getAllDocter )

router.get("/admin/User", isAdminAuthentication, getalluser )

router.get("/patient/User", ispatientAuthentication, getalluser )

router.get("/admin/logOut", isAdminAuthentication, logoutAdmin )

export default router;