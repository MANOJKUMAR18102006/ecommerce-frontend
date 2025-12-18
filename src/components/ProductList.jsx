import { useState } from "react";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import axios from "axios";

const ProductList = () => {
    const [products,setproducts]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            const res=await axios.get("http://localhost:2000/products")
            setproducts(res.data);
        }
        fetchData()
    },[])
    return(
        <>
        <div className="mx-auto p-5  flex justify-around flex-wrap bg-slate-900">
        {products.map((product) => {
            return(
                <ProductCard key={product._id} id={product._id} name={product.name} sellingprice={product.sellingprice} image={product.image} />
            )
        })
    }
        </div>
        </>
)
}

export default ProductList;