import express from "express";
import {
  saveJob,
  saveAffirmation,
  updateLastBrowsedJob,
} from "../Controllers/userUpdateController.js";

const router = express.Router();

router.post("/save-job", saveJob);
router.post("/save-affirmation", saveAffirmation);
router.post("/update-last-browsed", updateLastBrowsedJob);

export default router;
