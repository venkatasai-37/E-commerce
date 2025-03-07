import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
// import { useCart } from "../context/CartContext";
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/cartSlice';

const CartSummary=({cartProducts=[]})=>{
  const no_of_items= cartProducts.length;
  const Total_mrp = cartProducts.reduce((sum, product) => sum + (product.price * product.quantity || 0), 0);
  const Total_dicount=0;
  const platform_fee=10;
  const Taxes=10;
return(
  <div>
      <h1>Cart summary</h1>
      <p>No of items :  <b>{no_of_items}</b></p>
      <p>Total MRP :<b>${Total_mrp}</b></p>
      <p>Total Discount :<b>${Total_dicount}</b></p>
      <p>Platform fee : <b>${platform_fee}</b></p>
      <p>Taxes : <b>${Taxes}</b></p>
      <h2>Total Amount : ${Total_mrp+platform_fee+Taxes-Total_dicount} </h2>
      <button>Place order</button>

    </div>
)
};

export const Cart = () => {
  // const { cartItems } = useCart();  // Using the cartItems from context
  // console.log(cartItems)
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  if (!cartItems|| cartItems.length===0){
    return(
      <>
      <img id="empty-cart" src="/images/empty-cart.jpg"></img>
      <h2 id="cart-empty-msg">Your cart is empty..</h2>
      </>
      
    )
  }


  const [cartProducts, setCartProducts] = useState([]);  // Correct useState for cartProducts

  useEffect(() => {
    if (!cartItems ||cartItems.length === 0) {
      setCartProducts([]); // Clear products when cart is empty
      return;
    } // Only fetch if there are items in the cart
      const productIds = cartItems.map((item) => item.productId).join(",");
        
        fetch(`http://localhost:3000/products?_id=${productIds}`) 
            .then((res) => res.json())
            .then((data) => {

              // Map quantity to product data
          const productsWithQuantity = data.map((product) => {
            const matchingCartItem = cartItems.find(
              (item) => item.productId === product._id
            );
            return { ...product, quantity: matchingCartItem?.quantity || 1 };
          });
          setCartProducts(productsWithQuantity);
        })
        .catch((error) => console.error("Error fetching products:", error));
    
  }, [cartItems]);
//                 console.log("Fetched Products:", data); 
//                 setCartProducts(data);
//             })
//             .catch((error) => console.error("Error fetching products:", error));
//     }
// }, [cartItems]);

if (!cartProducts || cartProducts.length === 0) {
  return (
    <>
      <img id="empty-cart" src="/images/empty-cart.jpg" alt="Empty Cart" />
      <h2 id="cart-empty-msg">Your cart is empty..</h2>
    </>
  );
}
  return (
    <div className="product-container">
      {cartProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    {/* <div>
        <button onClick={() => dispatch(decreaseQuantity({ productId: item.productId }))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => dispatch(increaseQuantity({ productId: item.productId }))}>+</button>
        {/* <button onClick={() => dispatch(removeFromCart({ productId: item.productId }))}>Remove</button> */}
    {/* </div> */} 
    <div>
      {<CartSummary cartProducts={cartProducts} />
    }
      </div>
    </div>
    
  );
};

export default Cart;
