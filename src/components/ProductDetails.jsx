import { useParams, useLocation } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const { image, name, sellingprice } = location.state || {};

  if (!image) {
    return (
      <h1 className="text-center mt-10 text-red-500">
        No product data found
      </h1>
    );
  }
  

  return (
    <div className="flex flex-row">
    <div className="w-[50%] bg-slate-500 p-10 text-white h-screen flex items-center">
      <img
        src={image}
        alt={name}
        className="w-full rounded-xl"
      />
      </div>
      <div className="bg-slate-600 p-10 w-[50%] text-white mx-auto h-screen">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>

      <p className="text-xl font-semibold">
        Price: ₹{sellingprice}
      </p>

      <p className="text-sm mt-2 text-gray-200">
        Product ID: {id}
      </p>
      <button className="mt-10 px-4 py-3 rounded-xl bg-orange-500">Add to cart +</button>
      </div>
    </div>
  );
};

export default ProductDetails;
