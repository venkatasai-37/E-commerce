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

    let products = [];
    if (productIds.length > 0) {
      products = await Product.find({ _id: { $in: productIds } });
    }

    const finalResponse = {
      result: result,
      products: products,
    };

    res.json(finalResponse);
  } catch (err) {
    console.error("Chatbot recommendation failed:", err);
    return res.status(500).json({
      result: "Sorry, I couldn't process your request right now.",
      products: [],
    });
  }
});

module.exports = router;
