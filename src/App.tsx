import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/carts")
      .then((response) => {
        const carts = response.data.carts;
        const allProducts = carts.flatMap((cart: any) => cart.products);
        setProducts(allProducts);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // สร้างฟังก์ชันสุ่มประเภทสินค้าโดยดูจาก thumbnail path (จำลอง)
  const getCategoryFromThumbnail = (thumbnail: string): string => {
    if (thumbnail.includes("mobile-accessories")) return "Mobile Accessories";
    if (thumbnail.includes("sunglasses")) return "Sunglasses";
    if (thumbnail.includes("smartphones")) return "Smartphones";
    if (thumbnail.includes("grocery") || thumbnail.includes("groceries")) return "Groceries";
    if (thumbnail.includes("kitchen")) return "Kitchen";
    if (thumbnail.includes("motorcycle")) return "Vehicle";
    if (thumbnail.includes("vehicle")) return "Vehicle";
    if (thumbnail.includes("womens-shoes") || thumbnail.includes("mens-shoes")) return "Shoes";
    if (thumbnail.includes("beauty")) return "Beauty";
    if (thumbnail.includes("skin-care")) return "Skin Care";
    if (thumbnail.includes("womens-bags")) return "Bags";
    if (thumbnail.includes("watches")) return "Watches";
    if (thumbnail.includes("fragrances")) return "Fragrances";
    if (thumbnail.includes("home-decoration")) return "Home";
    if (thumbnail.includes("mens-shirts")) return "Men's Clothing";
    if (thumbnail.includes("womens-dresses")) return "Women's Clothing";

    return "Other";
  };

  // รวม products พร้อมประเภท
  const productsWithCategory = products.map((p) => ({
    ...p,
    category: getCategoryFromThumbnail(p.thumbnail),
  }));

  // แยกประเภทไม่ซ้ำ
  const uniqueCategories = ["all", ...Array.from(new Set(productsWithCategory.map((p) => p.category)))];

  // Filter product ตาม category ที่เลือก
  const filteredProducts =
    category === "all"
      ? productsWithCategory
      : productsWithCategory.filter((p) => p.category === category);

  return (
    <>
      <a href="./src/index.html">
    <button
      style={{
        alignItems: "left",
        display: "flex",
        justifyContent: "center",
        padding: "10px 20px",
        fontSize: "1rem",
        borderRadius: "8px",
        backgroundColor: "#40916c",
        color: "#ffffff",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        transition: "background-color 0.3s ease",
      }}
    >
      Summary Data
    </button>
  </a>

      <h1
        id="title"
        style={{
          color: "brown",
          paddingBottom: "20px",
          fontSize: "80px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        Sunny Shop 101
      </h1>

      <p
        style={{
          fontSize: "24px",
          textAlign: "center",
          color: "black",
          fontFamily: "sans-serif",
          paddingBottom: "20px",
        }}
      >
        Something 20 Bath!!
      </p>

      {/* Dropdown filter */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <label htmlFor="category" style={{ fontSize: "20px", paddingRight: "10px", color: "black" }}>
          Filter by Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ fontSize: "18px", padding: "6px", borderRadius: "5px" }}
        >
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid" style={{ padding: "20px" }}>
        {filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products found.</p>
        ) : (
          filteredProducts.map((product, index) => (
            <div key={index} className="product-card">
              <h2 style={{ fontSize: "20px", color: "black" }}>{product.title}</h2>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <p>Category: {product.category}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Discount: {product.discountPercentage}%</p>
              <p style={{ color: "red", fontWeight: "bold" }}>
                Price: {product.discountedTotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                Bath
              </p>
            </div>
          ))
        )
        }
      </div>
    </>
  

  );
}

export default App;