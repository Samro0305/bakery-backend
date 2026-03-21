const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// ROUTES (IMPORT FIRST — NO EXCEPTIONS)
const productRoutes = require("./routes/productRoutes");
const carouselRoutes = require("./routes/carouselRoutes");

const app = express();

/*MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* SWAGGER*/
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
        url: "http://localhost:5000", // fixed (was https)
      },
    ],
  },
  apis: ["./routes/*.js"], // fixed path
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*ROUTES */
app.use("/api/products", productRoutes);
app.use("/api/carousel", carouselRoutes);

/*  DB CONNECTION */
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Database connected ✅");
  } catch (error) {
    console.error("Database connection failed ❌", error);
  }
}

connectDB();

/* TEST ROUTE  */
app.get("/", (req, res) => {
  res.send("Bakery API is running 🚀");
});

/* SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});