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

// Public routes for viewing achievements
router.get("/", getAchievements);
router.get("/:id", getAchievement);

// Protected routes for admin only
router.use(verifyJWT);
router.use(authorizeRoles("admin"));
router.post("/create", upload.single('image'), createAchievement);


router.put("/:id",upload.single("image"), updateAchievement);
router.delete("/:id", deleteAchievement);

export default router;