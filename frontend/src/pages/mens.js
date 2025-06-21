import { useEffect,useState } from "react";
import ProductCard from "../components/ProductCard"; // If default export


const Mens = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/products?category=male")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched Products:", data); // Log response
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

export default Mens;
