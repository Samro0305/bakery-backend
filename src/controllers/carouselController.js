const prisma = require("../config/prisma");

exports.getCarousel = async (req, res) => {
  const items = await prisma.carousel.findMany({
  orderBy: { createdAt: "desc" }  });
  res.json(items);
};

exports.createCarousel = async (req, res) => {
  try {
    console.log("BODY:", req.body); // DEBUG

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
    res.status(500).json({ error: "Failed" });
  }
};

exports.deleteCarousel = async (req, res) => {
  const { id } = req.params;

  await prisma.carousel.delete({
    where: { id }
  });

  res.json({ message: "Deleted" });
};