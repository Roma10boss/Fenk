// src/pages/Home.js
import React, { useState } from "react";
import "./Home.css";

// Dummy products array
const dummyProducts = [
  { _id: 1, name: "Pink Backpack", price: "$35 - $40", category: "Backpack", image: "https://via.placeholder.com/250" },
  { _id: 2, name: "Nike Track Shoes", price: "$60", category: "Shoes", image: "https://via.placeholder.com/250" },
  { _id: 3, name: "Adidas Sneakers", price: "$60", category: "Shoes", image: "https://via.placeholder.com/250" },
  { _id: 4, name: "Running Shoes", price: "$40 - $45", category: "Shoes", image: "https://via.placeholder.com/250" },
  { _id: 5, name: "Black Jacket", price: "$60", category: "Jacket", image: "https://via.placeholder.com/250" },
  { _id: 6, name: "Blue Hoodie", price: "$55 - $60", category: "Hoodie", image: "https://via.placeholder.com/250" },
  { _id: 7, name: "Black T-Shirt", price: "$30", category: "T-Shirt", image: "https://via.placeholder.com/250" },
  { _id: 8, name: "Slim Fit Jeans", price: "$50 - $70", category: "Jeans", image: "https://via.placeholder.com/250" },
  { _id: 9, name: "Red Dress", price: "$50 - $70", category: "Dress", image: "https://via.placeholder.com/250" },
  { _id: 10, name: "Leather Boots", price: "$70 - $90", category: "Shoes", image: "https://via.placeholder.com/250" },
  { _id: 11, name: "Green Hat", price: "$20 - $30", category: "Hat", image: "https://via.placeholder.com/250" },
  { _id: 12, name: "Yellow Sunglasses", price: "$15 - $25", category: "Accessories", image: "https://via.placeholder.com/250" },
  { _id: 13, name: "White T-Shirt", price: "$20 - $25", category: "T-Shirt", image: "https://via.placeholder.com/250" },
  { _id: 14, name: "Denim Shorts", price: "$30 - $40", category: "Shorts", image: "https://via.placeholder.com/250" },
  { _id: 15, name: "Blue Cap", price: "$15 - $20", category: "Accessories", image: "https://via.placeholder.com/250" },
  { _id: 16, name: "Black Sneakers", price: "$60", category: "Shoes", image: "https://via.placeholder.com/250" },
];

const Home = ({ cartItems, setCartItems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const productsPerPage = 12;

  const filteredProducts = selectedCategory === "All" ? dummyProducts : dummyProducts.filter(product => product.category === selectedCategory);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // 🛒 Fixing Add to Cart
  const handleAddToCart = (product) => {
    const isInCart = cartItems.some(item => item._id === product._id);
    if (isInCart) {
      alert(`${product.name} is already in your cart.`);
    } else {
      setCartItems([...cartItems, product]);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Shop the Latest Trends</h1>

      <div className="content-container">
        {/* Sidebar Filter */}
        <aside className="filter-sidebar">
          <h2>Filter by Category</h2>
          <div className="category-filters">
            {["All", "Shoes", "Backpack", "Jacket", "Hoodie", "T-Shirt", "Jeans", "Dress", "Accessories"].map(category => (
              <label key={category} className="filter-label">
                <input type="radio" name="category" value={category} checked={selectedCategory === category} onChange={() => setSelectedCategory(category)} />
                {category}
              </label>
            ))}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="products-grid">
          {currentProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">{product.price}</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
          &lt; Previous
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default Home;
