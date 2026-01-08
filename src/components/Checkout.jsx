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
    <div className="w-full p-10 bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex gap-10">
        {/* Address Form */}
        <div className="flex-1 bg-slate-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Delivery Address</h2>
            {userProfile?.address?.name && (
              <span className="text-green-400 text-sm">Using saved address</span>
            )}
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={address.name}
              onChange={(e) => setAddress({...address, name: e.target.value})}
              className="w-full p-3 bg-slate-700 rounded border-none outline-none"
            />
            
            <input
              type="text"
              placeholder="Phone Number"
              value={address.phone}
              onChange={(e) => setAddress({...address, phone: e.target.value})}
              className="w-full p-3 bg-slate-700 rounded border-none outline-none"
            />
            
            <input
              type="text"
              placeholder="Street Address"
              value={address.street}
              onChange={(e) => setAddress({...address, street: e.target.value})}
              className="w-full p-3 bg-slate-700 rounded border-none outline-none"
            />
            
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({...address, city: e.target.value})}
                className="flex-1 p-3 bg-slate-700 rounded border-none outline-none"
              />
              
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress({...address, state: e.target.value})}
                className="flex-1 p-3 bg-slate-700 rounded border-none outline-none"
              />
              
              <input
                type="text"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setAddress({...address, pincode: e.target.value})}
                className="flex-1 p-3 bg-slate-700 rounded border-none outline-none"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-3">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
              
              <label className="flex items-center gap-3">
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
        <div className="w-96 bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-4">
            {products.map((item) => (
              <div key={item.product._id} className="flex justify-between">
                <span>{item.product.name} x{item.quantity}</span>
                <span>₹{item.product.sellingprice * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-2 border-t border-gray-600 pt-3">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>
          
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-bold mt-6"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;