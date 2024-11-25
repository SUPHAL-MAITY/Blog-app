import { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";










const router=Router()




router.route("/signup").post(registerController)



export default router;