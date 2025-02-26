import express from "express";
import {
  saveJob,
  saveAffirmation,
  updateLastBrowsedJob,
  isJobSaved,
} from "../Controllers/userUpdateController.js";

const router = express.Router();

router.post("/save-job", saveJob);
router.post("/save-affirmation", saveAffirmation);
router.post("/update-last-browsed", updateLastBrowsedJob);
router.post("/is-job-saved", isJobSaved);

export default router;
