import express from "express";
import {
  getCarousel,
  createCarousel,
  deleteCarousel
} from "../controllers/carouselController.js";

const router = express.Router();

router.get("/", getCarousel);
router.post("/", createCarousel);
router.delete("/:id", deleteCarousel);

export default router;