import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Checkout = () => {
  const [cart, setCart] = useState({ products: [] });
  const [userProfile, setUserProfile] = useState(null);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart
        const cartRes = await axios.get("https://ecommerce-backend-f0eb.onrender.com/carts", {
          headers: { Authorization: token }
        });
        setCart(cartRes.data.cart || { products: [] });

        // Fetch user profile
        const profileRes = await axios.get("http://localhost:2000/profile", {
          headers: { Authorization: token }
        });
        setUserProfile(profileRes.data.userData);
        
        // Use profile address if available
        if (profileRes.data.userData.address) {
          setAddress(profileRes.data.userData.address);
        }
      } catch (err) {
        setCart({ products: [] });
      }
    };
    fetchData();
  }, []);

  const products = cart.products || [];
  const subtotal = products.reduce((sum, item) => sum + item.product.sellingprice * item.quantity, 0);
  const deliveryCharge = products.length > 0 ? 50 : 0;
  const finalTotal = subtotal + deliveryCharge;

  const handlePlaceOrder = async () => {
    if (!address.name || !address.phone || !address.street || !address.city || !address.state || !address.pincode) {
      toast.error("Please fill all address fields");
      return;
    }

    try {
      const orderData = {
        billingAddress: address,
        paymentMethod
      };

      const { data } = await axios.post(
        "https://ecommerce-backend-f0eb.onrender.com/orders/create",
        orderData,
        { headers: { Authorization: token } }
      );

      toast.success(data.message);
      navigate("/orders");
    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="w-full p-2 sm:p-4 lg:p-10 bg-slate-900 text-white">
      <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center">Checkout</h1>
      
      <div className="flex gap-2 sm:gap-6 lg:gap-10">
        {/* Address Form */}
        <div className="flex-1 bg-slate-800 p-2 sm:p-4 lg:p-6 rounded-lg">
          <div className="flex flex-col gap-1 sm:gap-2 mb-3 sm:mb-4">
            <h2 className="text-sm sm:text-lg lg:text-xl font-bold">Delivery Address</h2>
            {userProfile?.address?.name && (
              <span className="text-green-400 text-xs">Using saved address</span>
            )}
          </div>
          
          <div className="space-y-2 sm:space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={address.name}
              onChange={(e) => setAddress({...address, name: e.target.value})}
              className="w-full p-2 sm:p-3 bg-slate-700 rounded border-none outline-none text-xs sm:text-sm lg:text-base"
            />
            
            <input
              type="text"
              placeholder="Phone Number"
              value={address.phone}
              onChange={(e) => setAddress({...address, phone: e.target.value})}
              className="w-full p-2 sm:p-3 bg-slate-700 rounded border-none outline-none text-xs sm:text-sm lg:text-base"
            />
            
            <input
              type="text"
              placeholder="Street Address"
              value={address.street}
              onChange={(e) => setAddress({...address, street: e.target.value})}
              className="w-full p-2 sm:p-3 bg-slate-700 rounded border-none outline-none text-xs sm:text-sm lg:text-base"
            />
            
            <div className="flex gap-1 sm:gap-4">
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({...address, city: e.target.value})}
                className="flex-1 p-2 sm:p-3 bg-slate-700 rounded border-none outline-none text-xs sm:text-sm lg:text-base"
              />
              
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress({...address, state: e.target.value})}
                className="flex-1 p-2 sm:p-3 bg-slate-700 rounded border-none outline-none text-xs sm:text-sm lg:text-base"
              />
              
              <input
                type="text"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setAddress({...address, pincode: e.target.value})}
                className="flex-1 p-2 sm:p-3 bg-slate-700 rounded border-none outline-none text-xs sm:text-sm lg:text-base"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-3 sm:mt-6">
            <h3 className="text-xs sm:text-base lg:text-lg font-bold mb-2 sm:mb-3">Payment Method</h3>
            <div className="space-y-1 sm:space-y-2">
              <label className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base">
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
              
              <label className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base">
                <input
                  type="radio"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI Payment
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-32 sm:w-64 lg:w-96 bg-slate-800 p-2 sm:p-4 lg:p-6 rounded-lg">
          <h2 className="text-sm sm:text-lg lg:text-xl font-bold mb-2 sm:mb-4">Order Summary</h2>
          
          <div className="space-y-1 sm:space-y-3 mb-2 sm:mb-4 max-h-32 sm:max-h-40 lg:max-h-none overflow-y-auto">
            {products.map((item) => (
              <div key={item.product._id} className="flex justify-between text-xs sm:text-sm lg:text-base">
                <span className="truncate mr-1 sm:mr-2">{item.product.name} x{item.quantity}</span>
                <span className="whitespace-nowrap">₹{item.product.sellingprice * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-1 sm:space-y-2 border-t border-gray-600 pt-2 sm:pt-3 text-xs sm:text-sm lg:text-base">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="flex justify-between font-bold text-xs sm:text-base lg:text-lg">
              <span>Total:</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>
          
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-500 hover:bg-green-600 py-2 sm:py-3 rounded-lg font-bold mt-3 sm:mt-6 text-xs sm:text-sm lg:text-base"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;