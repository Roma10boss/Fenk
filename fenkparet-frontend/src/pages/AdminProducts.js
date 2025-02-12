// src/pages/AdminProducts.js
import React, { useState } from "react";
import { FiTrash, FiUpload } from "react-icons/fi";
import "./AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    quantity: "",
    color: "",
    price: "",
    image: null, // File instead of URL
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle image upload
    });
  };

  // Handle Form Submission (Add Product)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.price || !formData.size || !formData.image) {
      alert("Please fill out all fields!");
      return;
    }

    const newProduct = {
      id: products.length + 1,
      name: formData.name,
      size: formData.size,
      quantity: formData.quantity,
      color: formData.color,
      price: parseFloat(formData.price).toFixed(2),
      image: URL.createObjectURL(formData.image), // Display uploaded image
    };

    setProducts([...products, newProduct]);
    setFormData({ name: "", size: "", quantity: "", color: "", price: "", image: null }); // Reset form
  };

  // Handle Product Removal
  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="admin-products-container">
      <h1 className="admin-products-title">Manage Products</h1>

      <div className="products-form-container">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
          <input type="text" name="size" placeholder="Size (S, M, L, XL)" value={formData.size} onChange={handleChange} />
          <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
          <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
          <label className="upload-label">
            <FiUpload className="upload-icon" /> Upload Image
            <input type="file" name="image" onChange={handleChange} />
          </label>
          <button type="submit" className="btn-primary">Add Product</button>
        </form>
      </div>

      <div className="products-list-container">
        <h2>Product List</h2>
        {products.length === 0 ? (
          <p className="no-products">No products added yet.</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p>Size: {product.size}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Color: {product.color}</p>
                <p>Price: ${product.price}</p>
                <button onClick={() => handleRemoveProduct(product.id)} className="remove-btn">
                  <FiTrash /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
