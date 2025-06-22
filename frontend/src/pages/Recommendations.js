import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Recommendations = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = location.state?.query || "";

  useEffect(() => {
    if (query) {
      fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Products:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
    }
  }, [query]);

  return (
    <div className="product-container">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Recommendations;
