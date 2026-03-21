const express = require("express");
const router = express.Router();

const {
  getCarousel,
  createCarousel,
  deleteCarousel
} = require("../controllers/carouselController");

router.get("/", getCarousel);
router.post("/", createCarousel);
router.delete("/:id", deleteCarousel);

module.exports = router;