import React from "react";
import "./AdminOrders.css";

const AdminOrders = ({ orders, setOrders }) => {
  const verifyOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: "Verified" } : order
    ));
  };

  return (
    <div className="admin-orders-container">
      <h1>Admin Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id} className="order-card">
            <p><strong>Order #{order.id}</strong></p>
            <p>Total: ${order.total.toFixed(2)}</p>
            <p>Status: {order.status}</p>
            <p>Expires: {order.expiresAt.toLocaleString()}</p>
            {order.status === "Pending Verification" && (
              <button onClick={() => verifyOrder(order.id)} className="verify-btn">Verify</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrders;
