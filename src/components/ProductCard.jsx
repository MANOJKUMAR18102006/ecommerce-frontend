import axios from "axios";
import { Link, useNavigate } from "react-router";
import {toast} from "react-toastify";

const ProductCard = (props) => {
    const{id,name,image,sellingprice}=props;
    const navigate=useNavigate()

    const handleCart = async (e) => {
    e.preventDefault(); // prevent Link navigation

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      await axios.post(
        "https://ecommerce-backend-f0eb.onrender.com/carts/add",
        {
          productId: id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Item added in cart")      
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };


    return (
        <>
        <div className="w-[400px] bg-slate-50 rounded-[20px] shadow-xl p-4 m-3 gap-10">
        <Link to={`/products/${id}`} state={{ id, name, image, sellingprice }}>
            <div className="">
                <img src={image} alt={name} className="w-full rounded-[20px] shadow-xl" />
                <h1 className="font-semibold text-[30px] text-center pt-4">{name}</h1>
                <p className="font-bold text-[30px] text-center pb-3">From ₹{sellingprice}*</p>
                </div>
                </Link>
                <button className="bg-orange-400 rounded-[15px] shadow-xl transform transition-transform duration-300 
            hover:scale-110 mb-4 p-3 pl-4 pr-4 ml-30 cursor-pointer" onClick={handleCart}>Add to Cart +</button>
            </div>
        </>
    );
};

export default ProductCard;