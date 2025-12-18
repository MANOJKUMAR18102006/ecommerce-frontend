import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const { data } = await axios.get(
          "https://ecommerce-backend-f0eb.onrender.com/orders/my-orders",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setOrders(data.orders || []);
      } catch (err) {
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-10 text-center">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-center text-gray-400">
          You have no orders yet
        </p>
      )}

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-slate-800 rounded-2xl shadow-xl p-6"
          >
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
              <div>
                <p className="text-sm text-gray-400">
                  Order ID: {order._id}
                </p>
                <p className="text-sm">
                  Order Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`font-bold ${
                    order.orderStatus === "delivered"
                      ? "text-green-400"
                      : order.orderStatus === "cancelled"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {order.orderStatus.toUpperCase()}
                </p>
                <p className="text-sm text-gray-400">
                  Payment: {order.paymentStatus}
                </p>
              </div>
            </div>

            {/* PRODUCTS */}
            <div className="space-y-4">
              {order.products.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between bg-slate-700 rounded-xl p-4"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg"
                    />

                    <div>
                      <h2 className="font-semibold text-lg">
                        {item.product.name}
                      </h2>
                      <p className="text-sm text-gray-300">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-bold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="grid grid-cols-2 gap-6 mt-6 border-t border-gray-700 pt-4">
              <div>
                <h3 className="font-semibold mb-2">
                  Billing Address
                </h3>
                <p className="text-sm text-gray-300">
                  {order.billingAddress.name}
                </p>
                <p className="text-sm text-gray-300">
                  {order.billingAddress.street},{" "}
                  {order.billingAddress.city}
                </p>
                <p className="text-sm text-gray-300">
                  {order.billingAddress.state} -{" "}
                  {order.billingAddress.pincode}
                </p>
                <p className="text-sm text-gray-300">
                  Phone: {order.billingAddress.phone}
                </p>
              </div>

              <div className="text-right">
                <p>Total Quantity: {order.totalQuantity}</p>
                <p className="font-bold text-lg">
                  Total Price: ₹{order.totalPrice}
                </p>
                <p className="text-sm text-gray-400">
                  Payment Method: {order.paymentMethod}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
