const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();

/*MIDDLEWARE (ORDER MATTERS)*/
app.use(cors());
app.use(express.json()); // MUST BE BEFORE ROUTES

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
  apis: ["./src/routes/*.js"], // where docs will be written
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*ROUTES*/
const productRoutes = require("./routes/productRoutes");
const carouselRoutes = require("./routes/carouselRoutes");

app.use("/api/products", productRoutes);
app.use("/api/carousel", carouselRoutes);

/*DB CONNECTION*/
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Database connected ✅");
  } catch (error) {
    console.error("Database connection failed ❌", error);
  }
}

connectDB();

/*TEST ROUTE*/
app.get("/", (req, res) => {
  res.send("Bakery API is running 🚀");
});

/*SERVER START*/
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});