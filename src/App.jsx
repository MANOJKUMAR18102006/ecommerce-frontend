import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import { useNavigate } from "react-router";
import ProductCard from "./components/ProductCard";
import axios from "axios";

const App = () => {

    const [products, setproducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("http://localhost:2000/products");
            setproducts(data);
        }
        fetchData()
    }, [])

    const navigate = useNavigate();

    const handleProduct = () => {
        navigate('/products');
    }

    return (
        <>
            <div className=" bg-slate-900">
                <div class="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-gradient-to-r from-slate-900 to-slate-800">
                    <div class="w-full  text-white space-y-6">
                        <h1 class="text-4xl font-bold">Buy the Latest Mobile Phone<br /> at Affordable Prices</h1>

                        <p class="text-lg text-slate-300 w-[70%]">Discover a wide range of smartphones from top brands like Realme, Vivo, iQOO, Samsung, and more.
                            Enjoy best deals, latest technology, and fast delivery.</p>

                        <div class="flex gap-4 pt-4">
                            <button
                                class="bg-violet-500 hover:bg-violet-400 text-white px-6 py-3 rounded-full font-semibold cursor-pointer " onClick={handleProduct}>Shop
                                Now</button>
                            
                        </div>

                    </div>

                    <div class="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
                        <img src="https://s.yimg.com/ny/api/res/1.2/tXwt3yTft72vRdP5DhSy6A--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xMzUw/https://media.zenfs.com/en/toms_guide_826/b0a9dfa0ebff4b11993de5af8a323461" alt="Latest Phones" class="rounded-2xl shadow-2xl w-[80%] " />
                    </div>

                </div>
                <div class="w-full px-10 py-4 flex justify-center items-center text-white">
                    <p class="flex gap-15 text-lg font-semibold pt-5 text-[30px]">Featured Phones</p>
                </div>
                <div className="mx-auto p-5  flex justify-around flex-wrap bg-slate-900 ">
                    {products.slice(0, 3).map((product) => {
                        return (
                            <ProductCard id={product._id} name={product.name} sellingprice={product.sellingprice} image={product.image} />
                        )
                    })
                    }
                </div>
                <Footer />
            </div>
        </>
    )
}

export default App;