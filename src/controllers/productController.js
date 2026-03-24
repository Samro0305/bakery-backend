import prisma from "../config/prisma.js";

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, sku, availability } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image_url,
        sku,
        availability,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { q = "" } = req.query;

    const products = await prisma.product.findMany({
      where: q
        ? {
            name: {
              contains: q,
              mode: "insensitive",
            },
          }
        : {},
    });

    res.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: req.body,
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};