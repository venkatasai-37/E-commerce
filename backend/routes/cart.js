const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// Get cart
router.get("/", async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    console.error("Error getting cart:", err);
    res.status(500).send("Server error");
  }
});

// Add to cart
router.post("/add", async (req, res) => {
  const { productId, quantity } = req.body;
  console.log("Adding to cart:", { productId, quantity }); // Debugging log
  try {
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [] });
    }

    const index = cart.items.findIndex((i) => i.productId.equals(productId));
    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    console.log("Cart updated:", cart); // Debugging log
    res.json(cart);
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).send("Server error");
  }
});

// Remove item
router.post("/remove", async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne();
    if (!cart) return res.status(404).send("Cart not found");

    cart.items = cart.items.filter((i) => !i.productId.equals(productId));
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("Remove error:", err);
    res.status(500).send("Server error");
  }
});

// Clear cart
router.post("/clear", async (req, res) => {
  try {
    await Cart.deleteMany(); // or Cart.findOneAndDelete()
    res.send("Cart cleared");
  } catch (err) {
    console.error("Clear cart error:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
