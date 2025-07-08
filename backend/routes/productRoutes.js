const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../models/products");

router.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/products", async (req, res) => {
  const category = req.query.category;
  const id = req.query._id;
  const ids = req.query._id?.split(",");
  try {
    let products;
    if (ids && ids.length > 0) {
      // Check if all IDs are valid MongoDB ObjectIDs
      const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
      if (validIds.length === 0) {
        return res.status(400).send({ error: "Invalid ID format" });
      }
      // Fetch products whose IDs are in the validIds array
      products = await Product.find({ _id: { $in: validIds } });
    } else if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }
      products = await Product.findById(id);
      if (!products) {
        return res.status(404).send({ error: "Product not found" });
      }
    } else if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }
    res.status(200).send(products);
  } catch (e) {
    console.error("❌ Error Fetching Products:", e);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
