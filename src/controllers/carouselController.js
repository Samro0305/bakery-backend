import prisma from "../config/prisma.js";

// GET ALL
export const getCarousel = async (req, res) => {
  try {
    const items = await prisma.carousel.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch carousel" });
  }
};

// CREATE
export const createCarousel = async (req, res) => {
  try {
    const { title, image_url } = req.body;

    if (!title || !image_url) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const item = await prisma.carousel.create({
      data: {
        title,
        image_url
      }
    });

    res.json(item);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create" });
  }
};

// DELETE
export const deleteCarousel = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.carousel.delete({
      where: { id }
    });

    res.json({ message: "Deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
};