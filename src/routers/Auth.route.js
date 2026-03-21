import express from "express";
const router = express.Router();
import {
  Signin,
  Signup,
  Signout,
  RefreshToken,
  getCurrentUser
} from "../controllers/Auth.controller.js";
import {  validateMiddleware } from "../middlewares/validate.middleware.js";
import { signupSchema, signinSchema } from "../validators/auth.validator.js";
import upload from "../middlewares/Upload.middleware.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";


router.post("/signup",upload.single('avatar'),validateMiddleware(signupSchema), Signup);
router.post("/signin",validateMiddleware(signinSchema), Signin);
router.post("/logout",verifyJWT, Signout);  
router.post("/refresh-token", RefreshToken);
router.get("/me", verifyJWT, getCurrentUser);

export default router;
