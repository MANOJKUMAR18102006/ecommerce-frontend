import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const AdminPage = () => {
    const navigate = useNavigate()
    const [productname, setproductname] = useState('');
    const [image, setimage] = useState('');
    const [sellingprice, setsellingprice] = useState('');
    const [originalprice, setoriginalprice] = useState('');

    const handleProductname = (e) => {
        setproductname(e.target.value)
    }

    const handleImage = (e) => {
        setimage(e.target.value)
    }

    const handleSellingprice = (e) => {
        setsellingprice(e.target.value);
    }

    const handleOriginalprice = (e) => {
        setoriginalprice(e.target.value)
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        const res = await axios.post("https://ecommerce-backend-f0eb.onrender.com/products", {
            name: productname,
            image: image,
            sellingprice: sellingprice,
            originalprice: originalprice,
        });
        navigate('/products')
    }

    return (
        <>
            <div className="mt-10 w-[500px] flex flex-col  mx-auto p-2 bg-violet-200 shadow-lg rounded-xl ">
                <div className="flex flex-col ml-15">
                    <h1 className="font-bold text-2xl mb-5 pt-5 text-center">Add Product</h1>
                    <label className="font-bold ">Name:</label>
                    <input type="text" placeholder="Product name" className="border p-2 rounded-[5px] w-[85%]"
                        value={productname} onChange={handleProductname} />
                    <label className="font-bold mt-5">Image-Url:</label>
                    <input type="text" placeholder="Product image url" className="border p-2 rounded-[5px] w-[85%] "
                        value={image} onChange={handleImage} />
                    <label className="font-bold mt-5">Selling Price:</label>
                    <input type="number" placeholder="selling price" className="border p-2 rounded-[5px] w-[85%]"
                        value={sellingprice} onChange={handleSellingprice} />
                    <label className="font-bold mt-5">Original Price:</label>
                    <input type="number" placeholder="Original price" className="border p-2 rounded-[5px] w-[85%]"
                        value={originalprice} onChange={handleOriginalprice} />
                    <button className="bg-orange-600 text-white text-lg p-2 py-2 rounded-lg mt-5 ml-20 w-[50%] mb-5" onClick={handleAdd}>Add</button>
                </div>
            </div>
        </>
    )
}

export default AdminPage;