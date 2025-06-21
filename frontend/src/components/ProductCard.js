import React, { useState } from 'react';
// import { useCart } from '../context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQuantity, decreaseQuantity ,removeFromCart} from '../redux/cartSlice';


const ProductCard = ({ product }) => {

  const dispatch = useDispatch();

  // Getting cart item using useSelector
  const cartItem = useSelector(state => state.cart.items.find(item => item.productId === product._id));
  const quantity = cartItem?.quantity || 0;
  // const {addToCart}=useCart();
  const [isWhishlisted,setIsWhishlisted]=useState(false)
  // const [isAdded_To_Cart,setIsAdded_To_Cart]=useState(false)
  // const [no_of_items,setNo_of_items]=useState(1)
  const handleWishlist=()=>{
    
    setIsWhishlisted(!isWhishlisted)
  }
  const handleCart=()=>{
    // addToCart(product._id)
    // setIsAdded_To_Cart(true)
    dispatch(addToCart({ productId: product._id })); // Dispatching add to cart action

    
  }
  const handlePlus=()=>{
    // setNo_of_items(no_of_items+1)
    dispatch(increaseQuantity({ productId: product._id })); // Dispatching increase quantity action


  }
  const handleMinus=()=>{
  //   if (no_of_items==1){
  //     setNo_of_items(0)
  //     setIsAdded_To_Cart(false)
  //   }
  //   else{
  //     setNo_of_items(no_of_items-1)

  // }
  if (quantity > 1) {
    dispatch(decreaseQuantity({ productId: product._id }));
} else {
    dispatch(removeFromCart({ productId: product._id }));
}
  }
  const plusminus=()=>{
    return(
      <div className="plusMinusContainer">
      <button className="plusminusButton" onClick={handleMinus}>
          <img src="/images/minus.png" alt="Minus" />
      </button>
      <span className="quantityDisplay">{quantity}</span>
      <button className="plusminusButton" onClick={handlePlus}>
          <img src="/images/plus.png" alt="Plus" />
      </button>
  </div>
    )
  }
  const notplusminus=()=>{
      return(
        <>
        <button className="addToCartButton" onClick={handleCart}>Add to cart</button>
        </>
      )
  }
  return (
    <div className="ProductBox">
      <img id="productImage" src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <div className="buttonContainer">

      {quantity> 0 ? plusminus(): notplusminus()}
      
    
    <button id="wishlist" onClick={handleWishlist}>
        <img src={ isWhishlisted? "/images/heart.png":"/images/wishlist.png"} alt="Wishlist" />
    </button>
</div>

    </div>
  );
};

export default ProductCard; // ✅ Ensure this export is present
