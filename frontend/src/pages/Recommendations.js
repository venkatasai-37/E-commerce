import { useEffect,useState } from "react";
import ProductCard from "../components/ProductCard"; // If default export


const Recommendations = (query) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            query: query
          })
        })
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched Products:", data);
          setProducts(data);
        })
        .catch((error) => console.error("Error fetching products:", error));
      }, []);
      

    return (
        <div className="product-container">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default Recommendations;
