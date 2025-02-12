import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { FiMenu, FiX, FiHome, FiClipboard, FiPieChart, FiBox, FiTrash, FiPlus } from "react-icons/fi";
import "./AdminDashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");

  // Dummy Orders Data
  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", total: 49.99, status: "Pending", email: "john@example.com", phone: "123-456-7890" },
    { id: 2, customer: "Jane Smith", total: 99.99, status: "Shipped", email: "jane@example.com", phone: "098-765-4321" },
    { id: 3, customer: "Bob Johnson", total: 74.50, status: "Pending", email: "bob@example.com", phone: "567-890-1234" },
  ]);

  // Dummy Products Data
  const [products, setProducts] = useState([
    { id: 1, name: "Nike Sneakers", stock: 10, size: "M", color: "Black", price: 59.99, image: "" },
    { id: 2, name: "Adidas T-shirt", stock: 5, size: "L", color: "White", price: 19.99, image: "" },
    { id: 3, name: "Levi's Jeans", stock: 8, size: "32", color: "Blue", price: 39.99, image: "" },
  ]);

  // Dummy Tickets Data
  const [tickets, setTickets] = useState([
    { id: 1, user: "Alice", issue: "Login issue", status: "Open", email: "alice@example.com", phone: "234-567-8901" },
    { id: 2, user: "Bob", issue: "Payment issue", status: "Resolved", email: "bob@example.com", phone: "345-678-9012" },
  ]);

  // Dummy Analytics Data
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{ label: "Sales ($)", data: [150, 200, 180, 220, 300, 250, 400], backgroundColor: "#ffeba7" }],
  };

  // Status Updates
  const [orderStatusUpdates, setOrderStatusUpdates] = useState({});
  const [ticketStatusUpdates, setTicketStatusUpdates] = useState({});
  const [stockUpdates, setStockUpdates] = useState({});

  // Status Options
  const orderStatusOptions = ["Pending", "Confirmed", "Shipped", "Delivered"];
  const ticketStatusOptions = ["Open", "In Progress", "Resolved"];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Update Order Status
  const handleOrderStatusChange = (orderId, newStatus) => {
    setOrderStatusUpdates((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const handleSubmitOrderUpdate = (orderId) => {
    const updatedStatus = orderStatusUpdates[orderId];
    if (!updatedStatus) {
      alert("Select a status before submitting.");
      return;
    }

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: updatedStatus } : order
      )
    );

    // Placeholder for notification feature
    const order = orders.find((o) => o.id === orderId);
    console.log(`Send notification to ${order.email} / ${order.phone}: Order #${orderId} updated to "${updatedStatus}"`);

    alert(`✅ Order #${orderId} updated to "${updatedStatus}"`);
  };

  // Update Ticket Status
  const handleTicketStatusChange = (ticketId, newStatus) => {
    setTicketStatusUpdates((prev) => ({ ...prev, [ticketId]: newStatus }));
  };

  const handleSubmitTicketUpdate = (ticketId) => {
    const updatedStatus = ticketStatusUpdates[ticketId];
    if (!updatedStatus) {
      alert("Select a status before submitting.");
      return;
    }

    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: updatedStatus } : ticket
      )
    );

    // Placeholder for notification feature
    const ticket = tickets.find((t) => t.id === ticketId);
    console.log(`Send notification to ${ticket.email} / ${ticket.phone}: Ticket #${ticketId} updated to "${updatedStatus}"`);

    alert(`✅ Ticket #${ticketId} updated to "${updatedStatus}"`);
  };

  // Add Product
  const handleAddProduct = () => {
    const name = prompt("Enter product name:");
    const stock = parseInt(prompt("Enter stock quantity:"), 10);
    const size = prompt("Enter size (e.g., S, M, L, 32, 42):");
    const color = prompt("Enter color:");
    const price = parseFloat(prompt("Enter price:"));

    if (name && !isNaN(stock) && size && color && !isNaN(price)) {
      const newProduct = {
        id: products.length + 1,
        name,
        stock,
        size,
        color,
        price,
        image: "", // You can add an image URL if needed
      };
      setProducts([...products, newProduct]);
      alert(`✅ Product "${name}" added successfully!`);
    } else {
      alert("Invalid input. Fill all fields correctly.");
    }
  };

  // Delete Product
  const handleDeleteProduct = (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      alert(`✅ Product deleted successfully!`);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={toggleSidebar} className="text-xl mb-5">
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
        <nav className="space-y-4">
          <button onClick={() => setActiveTab("orders")} className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}>
            <FiHome /> {isSidebarOpen && "Orders"}
          </button>
          <button onClick={() => setActiveTab("tickets")} className={`tab-btn ${activeTab === "tickets" ? "active" : ""}`}>
            <FiClipboard /> {isSidebarOpen && "Tickets"}
          </button>
          <button onClick={() => setActiveTab("products")} className={`tab-btn ${activeTab === "products" ? "active" : ""}`}>
            <FiBox /> {isSidebarOpen && "Products"}
          </button>
          <button onClick={() => setActiveTab("analytics")} className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}>
            <FiPieChart /> {isSidebarOpen && "Analytics"}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="text-2xl font-bold text-yellow-400">Admin Dashboard</h1>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="tab-content">
            {orders.map((order) => (
              <div key={order.id} className="card">
                <h3>Order #{order.id}</h3>
                <p>Customer: {order.customer}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
                <p>Email: {order.email}</p>
                <p>Phone: {order.phone}</p>

                <label>Status:</label>
                <select
                  value={orderStatusUpdates[order.id] || order.status}
                  onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                >
                  {orderStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button onClick={() => handleSubmitOrderUpdate(order.id)}>Submit</button>
              </div>
            ))}
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === "tickets" && (
          <div className="tab-content">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="card">
                <h3>Ticket #{ticket.id}</h3>
                <p>User: {ticket.user}</p>
                <p>Issue: {ticket.issue}</p>
                <p>Email: {ticket.email}</p>
                <p>Phone: {ticket.phone}</p>

                <label>Status:</label>
                <select
                  value={ticketStatusUpdates[ticket.id] || ticket.status}
                  onChange={(e) => handleTicketStatusChange(ticket.id, e.target.value)}
                >
                  {ticketStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button onClick={() => handleSubmitTicketUpdate(ticket.id)}>Submit</button>
              </div>
            ))}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="tab-content">
            <button onClick={handleAddProduct} className="add-product-btn">
              <FiPlus /> Add Product
            </button>
            {products.map((product) => (
              <div key={product.id} className="card">
                <h3>{product.name}</h3>
                <p>Stock: {product.stock}</p>
                <p>Size: {product.size}</p>
                <p>Color: {product.color}</p>
                <p>Price: ${product.price.toFixed(2)}</p>
                <button onClick={() => handleDeleteProduct(product.id)} className="delete-btn">
                  <FiTrash /> Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && <Bar data={data} />}
      </div>
    </div>
  );
};

export default AdminDashboard;