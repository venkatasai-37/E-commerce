const express = require("express");
const axios = require("axios");
const Product = require("../models/products");

const router = express.Router();

router.post("/chatbot", async (req, res) => {
  const { query } = req.body;
  try {
    // Call Python service
    const aiRes = await axios.post("http://localhost:8000/chat", { query });
    const result = aiRes.data.result;
    const productIds = aiRes.data.product_ids || [];
    console.log("AI Result:", result);

    // Fix syntax error in the if statement
    if (productIds.length !== 0) {
      const products = await Product.find({ _id: { $in: productIds } });

      // Use names or categories to get full data (including image, price)
      // const names = recProducts.map(p => p.name);
      // const products = await Product.find({ name: { $in: names } });

      res.json(products);
    } else {
      res.status(404).send("No products found");
    }
  } catch (err) {
    console.error("Chatbot recommendation failed:", err);
    res.status(500).send("Failed to get recommendations");
  }
});

module.exports = router;
