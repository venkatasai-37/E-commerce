import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../services/CartService"; 

const CartSummary = ({ cartProducts = [], cartItems = [], onClearCart }) => {
  const no_of_items = cartItems.length;

  const Total_mrp = cartItems.reduce((sum, item) => {
    const product = cartProducts.find(
      (product) => product._id === item.productId
    );
    const price = product ? product.price : 0;
    return sum + price * item.quantity;
  }, 0);

  const Total_discount = 0;
  const platform_fee = 10;
  const Taxes = 10;

  return (
    <div>
      <h1>Cart summary</h1>
      <p>
        No of items: <b>{no_of_items}</b>
      </p>
      <p>
        Total MRP: <b>${Total_mrp.toFixed(2)}</b>
      </p>
      <p>
        Total Discount: <b>${Total_discount}</b>
      </p>
      <p>
        Platform fee: <b>${platform_fee}</b>
      </p>
      <p>
        Taxes: <b>${Taxes}</b>
      </p>
      <h2>
        Total Amount: $
        {(Total_mrp + platform_fee + Taxes - Total_discount).toFixed(2)}
      </h2>
      <button>Place order</button>
      <button onClick={onClearCart}>Clear Cart</button>
    </div>
  );
};

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCartItems(data.items);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCartItems([]);
      setCartProducts([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      setCartProducts([]);
      return;
    }

    const productIds = cartItems.map((item) => item.productId).join(",");
    fetch(`http://localhost:5000/products?_id=${productIds}`)
      .then((res) => res.json())
      .then((data) => {
        setCartProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [cartItems]);

  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <img id="empty-cart" src="/images/empty-cart.jpg" alt="Empty Cart" />
        <h2 id="cart-empty-msg">Your cart is empty..</h2>
      </>
    );
  }

  return (
    <div className="product-container-with-summary">
      {cartProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          cartItems={cartItems}
          onCartChange={loadCart}
        />
      ))}

      <div className="cart-summary-container">
        <CartSummary
          cartProducts={cartProducts}
          cartItems={cartItems}
          onClearCart={handleClearCart}
        />
      </div>
    </div>
  );
};
export default Cart;
