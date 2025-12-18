import { useParams } from "react-router";

const ProductDetails = ()=> {
    const {id,}=useParams()
    return (
        <div className="bg-slate-500 p-10 w-[30%] text-white mx-auto flex justify-center mt-10">
        <h1>Product ID: {id}</h1>
        {/* <img src={image}/> */}
        </div>
    )
}

export default ProductDetails;