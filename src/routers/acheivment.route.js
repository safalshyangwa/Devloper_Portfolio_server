import express from "express";
import {
createAchievement,
getAchievements,
getAchievement,
updateAchievement,
deleteAchievement
} from "../controllers/acheivement.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/Auth.middleware.js";
import upload from '../middlewares/Upload.middleware.js'

const router = express.Router();

// Only logged-in admin can access these routes
router.use(verifyJWT);
router.use(authorizeRoles("admin"));
router.post("/create",upload.single('image'), createAchievement);
router.get("/", getAchievements);
router.get("/:id", getAchievement);
router.put("/:id", updateAchievement);
router.delete("/:id", deleteAchievement);

export default router;