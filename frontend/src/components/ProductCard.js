import React, { useState, useEffect } from "react";
import { addToCart, removeFromCart, getCart } from "../services/CartService";

const ProductCard = ({ product, cartItems = [], onCartChange }) => {
  const [quantity, setQuantity] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const fetchQuantityFromDB = async () => {
    try {
      const cart = await getCart();
      const cartItem = cart.items.find(
        (item) => item.productId === product._id
      );
      // console.log("cart-item",cartItem);
      setQuantity(cartItem ? cartItem.quantity : 0);
    } catch (error) {
      console.error("Error fetching quantity:", error);
    }
  };

  useEffect(() => {
    fetchQuantityFromDB();
  }, [product._id]);

  const handleAddToCart = async () => {
    try {
      console.log("Adding to cart:", product._id); // Debugging log
      await addToCart(product._id, 1);
      await fetchQuantityFromDB(); // ensure UI updates after DB update
      if (onCartChange) onCartChange();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleIncrease = async () => {
    try {
      await addToCart(product._id, 1);
      await fetchQuantityFromDB();
      if (onCartChange) onCartChange();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const handleDecrease = async () => {
    try {
      if (quantity > 1) {
        await addToCart(product._id, -1);
      } else {
        await removeFromCart(product._id);
      }
      await fetchQuantityFromDB();
      if (onCartChange) onCartChange();
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="ProductBox">
      <img id="productImage" src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>

      <div className="buttonContainer">
        {quantity > 0 ? (
          <div className="plusMinusContainer">
            <button className="plusminusButton" onClick={handleDecrease}>
              <img src="/images/minus.png" alt="Minus" />
            </button>
            <span className="quantityDisplay">{quantity}</span>
            <button className="plusminusButton" onClick={handleIncrease}>
              <img src="/images/plus.png" alt="Plus" />
            </button>
          </div>
        ) : (
          <button className="addToCartButton" onClick={handleAddToCart}>
            Add to cart
          </button>
        )}

        <button id="wishlist" onClick={handleWishlist}>
          <img
            src={isWishlisted ? "/images/heart.png" : "/images/wishlist.png"}
            alt="Wishlist"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
