import "./App.css";
import { useEffect, useState } from "react";
import Login from "./Login";
import Form from "./Form";
import axios from "axios";

// Recommended
function App() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <>
      <h1
        id="title"
        style={{
          color:"brown",
          paddingBottom: "20px",
          fontSize: "100px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        Sunny Shop 101
      </h1>

      <p style={{ fontSize: "30px", textAlign: "center", color:"black" , fontFamily:"sans-serif"}}> Something 20 Bath!! </p>

      <div className="product-grid" style={{ paddingTop:"20px" }}>
        {products.map((product) => (
          <div className="product-card">
            <h1 style={{ fontSize: "35px", paddingBottom: "15px", color:"black" }}>{product.title}</h1>
            <img src={product.images[0]} alt={product.title} style={{ width: "100%" }} />
            <p style={{ fontSize: "15px" , color:"black"}}>{product.description}</p>
            <h4 style={{ fontSize: "40px" , color:"black"}}>Price {product.price} Bath Naja</h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;