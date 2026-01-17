import express from "express";
import { addEvent } from "../controllers/event.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), addEvent);

export const eventRoute = router;
