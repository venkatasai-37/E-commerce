const express = require("express");
const mongoose = require("mongoose");
const connectionURL = "mongodb://127.0.0.1:27017/ecommerce_db";

const router = require("./routes/productRoutes");
const chatbotRouter = require("./routes/chatbot");
const cartRoutes = require("./routes/cart");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);
app.use("/cart", cartRoutes);
app.use(chatbotRouter);

mongoose
  .connect(connectionURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("server is up on port: 5000");
    });
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
