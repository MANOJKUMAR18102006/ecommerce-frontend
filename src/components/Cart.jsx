import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {toast} from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState({ products: [] });
  const navigate=useNavigate()

  const token = sessionStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const { data } = await axios.get("http://localhost:2000/carts", {
        headers: {
          Authorization: token,
        },
      });
      setCart(data.cart || { products: [] });
    } catch (err) {
      setCart({ products: [] });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const products = cart.products || [];

  const originalTotal = products.reduce(
    (sum, item) =>
      sum + item.product.originalprice * item.quantity,
    0
  );

  const subtotal = products.reduce(
    (sum, item) =>
      sum + item.product.sellingprice * item.quantity,
    0
  );

  const discount = originalTotal - subtotal;
  const deliveryCharge = products.length > 0 ? 50 : 0;
  const finalTotal = subtotal + deliveryCharge;

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;

    await axios.put(
      "http://localhost:2000/carts/update",
      { productId, quantity: newQty },
      { headers: { Authorization: token } }
    );

    fetchCart();
  };

  // 🔹 REMOVE ITEM
  const removeItem = async (productId) => {
    await axios.delete(
      `http://localhost:2000/carts/delete/${productId}`,
      { headers: { Authorization: token } }
    );

    fetchCart();
  };

  const handleBuy = async () => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }
    const orderData = {
      billingAddress: {
        name: "Test User",
        phone: "9999999999",
        street: "MG Road",
        city: "Chennai",
        state: "TN",
        pincode: "600001",
      },
      paymentMethod: "COD",
    };

    const {data}=await axios.post(
      "http://localhost:2000/orders/create",
      orderData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    toast.success(data.message);
    navigate("/orders");
  } catch (err) {
    alert("Failed to place order");
  }
};



  return (
    <div className="w-full flex justify-around gap-5 p-10 bg-slate-900 text-white">
      {/* CART ITEMS */}
      <div className="flex-1 max-w-[900px]">
        <h1 className="font-bold text-[30px] p-5">Cart Items</h1>

        {products.length === 0 && (
          <p className="p-5">Your cart is empty</p>
        )}

        {products.map((item) => (
          <div key={item.product._id} className="bg-slate-800 rounded-[20px] p-6 m-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-[180px] h-[140px] rounded-[15px]"
              />

              <div>
                <h2 className="font-bold text-xl">
                  {item.product.name}
                </h2>
                <p className="text-lg">₹{item.product.sellingprice}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                  className="bg-red-500 w-10 h-10 rounded-full text-xl font-bold flex items-center justify-center">
                  − </button>

                {/* Quantity */}
                <span className="text-xl font-bold w-6 text-center">
                  {item.quantity}
                </span>

                {/* Plus */}
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity + 1)
                  }
                  className="bg-green-500 w-10 h-10 rounded-full text-xl font-bold flex items-center justify-center"
                >
                  +
                </button>
              </div>

              {/* BUY + CANCEL */}
              <div className="flex gap-3 mt-2">
                <button
                  className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleBuy}>
                  Buy
                </button>

                <button
                  onClick={() => removeItem(item.product._id)}
                  className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-[500px]">
        <h1 className="font-bold text-[30px] p-5">Bill Summary</h1>

        <div className="bg-slate-800 rounded-[20px] p-6 space-y-3">
          <div className="flex justify-between">
            <span>Original Price</span>
            <span>₹{originalTotal}</span>
          </div>

          <div className="flex justify-between text-green-400">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>₹{deliveryCharge}</span>
          </div>

          <hr className="border-gray-600" />

          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>
          <div className="flex justify-center font-bold">
            <button className="w-[50%] bg-green-500 py-4 rounded-[15px] " onClick={handleBuy}>Buy All</button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Cart;
