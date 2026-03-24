import express from "express";
import cors from "cors";
import prisma from "./config/prisma.js";

import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

// ROUTES
import productRoutes from "./routes/productRoutes.js";
import carouselRoutes from "./routes/carouselRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* SWAGGER */
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bakery API",
      version: "1.0.0",
      description: "E-commerce Product API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* ROUTES */
app.use("/api/products", productRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/auth", authRoutes);

/* DB CONNECTION */
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Database connected ✅");
  } catch (error) {
    console.error("Database connection failed ❌", error);
  }
}

connectDB();

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Bakery API is running 🚀");
});

/* SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});