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
      const { data } = await axios.get("https://ecommerce-backend-f0eb.onrender.com/carts", {
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
      "https://ecommerce-backend-f0eb.onrender.com/carts/update",
      { productId, quantity: newQty },
      { headers: { Authorization: token } }
    );

    fetchCart();
  };

  // 🔹 REMOVE ITEM
  const removeItem = async (productId) => {
    await axios.delete(
      `https://ecommerce-backend-f0eb.onrender.com/carts/delete/${productId}`,
      { headers: { Authorization: token } }
    );

    fetchCart();
  };

  const handleBuy = () => {
    navigate("/checkout");
  };



  return (
    <div className="w-full flex justify-around gap-2 sm:gap-5 p-2 sm:p-4 lg:p-10 bg-slate-900 text-white">
      {/* CART ITEMS */}
      <div className="flex-1 max-w-full lg:max-w-[900px]">
        <h1 className="font-bold text-lg sm:text-2xl lg:text-[30px] p-1 sm:p-2 lg:p-5">Cart Items</h1>

        {products.length === 0 && (
          <p className="p-1 sm:p-2 lg:p-5 text-sm sm:text-base">Your cart is empty</p>
        )}

        {products.map((item) => (
          <div key={item.product._id} className="bg-slate-800 rounded-[10px] sm:rounded-[20px] p-2 sm:p-4 lg:p-6 m-1 sm:m-2 lg:m-3 flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 sm:w-[120px] lg:w-[180px] h-12 sm:h-[120px] lg:h-[140px] rounded-[8px] sm:rounded-[15px] object-cover"
              />

              <div>
                <h2 className="font-bold text-xs sm:text-lg lg:text-xl">
                  {item.product.name}
                </h2>
                <p className="text-xs sm:text-base lg:text-lg">₹{item.product.sellingprice}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                  className="bg-red-500 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 rounded-full text-sm sm:text-lg lg:text-xl font-bold flex items-center justify-center">
                  − </button>

                {/* Quantity */}
                <span className="text-sm sm:text-lg lg:text-xl font-bold w-4 sm:w-6 text-center">
                  {item.quantity}
                </span>

                {/* Plus */}
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, item.quantity + 1)
                  }
                  className="bg-green-500 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 rounded-full text-sm sm:text-lg lg:text-xl font-bold flex items-center justify-center"
                >
                  +
                </button>
              </div>

              {/* BUY + CANCEL */}
              <div className="flex gap-1 sm:gap-3 mt-1 sm:mt-2">
                <button
                  className="bg-blue-600 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-700 text-xs sm:text-sm lg:text-base"
                onClick={handleBuy}>
                  Buy
                </button>

                <button
                  onClick={() => removeItem(item.product._id)}
                  className="bg-gray-600 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg hover:bg-gray-700 text-xs sm:text-sm lg:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-32 sm:w-64 lg:w-[500px]">
        <h1 className="font-bold text-lg sm:text-2xl lg:text-[30px] p-1 sm:p-2 lg:p-5">Bill Summary</h1>

        <div className="bg-slate-800 rounded-[10px] sm:rounded-[20px] p-2 sm:p-4 lg:p-6 space-y-2 sm:space-y-3">
          <div className="flex justify-between text-xs sm:text-sm lg:text-base">
            <span>Original Price</span>
            <span>₹{originalTotal}</span>
          </div>

          <div className="flex justify-between text-green-400 text-xs sm:text-sm lg:text-base">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>

          <div className="flex justify-between text-xs sm:text-sm lg:text-base">
            <span>Delivery</span>
            <span>₹{deliveryCharge}</span>
          </div>

          <hr className="border-gray-600" />

          <div className="flex justify-between font-bold text-sm sm:text-lg lg:text-xl">
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>
          <div className="flex justify-center font-bold">
            <button className="w-full bg-green-500 py-2 sm:py-3 lg:py-4 rounded-[10px] sm:rounded-[15px] text-xs sm:text-sm lg:text-base" onClick={handleBuy}>Buy All</button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Cart;
