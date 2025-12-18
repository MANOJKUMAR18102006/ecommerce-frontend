import { Link } from "react-router";

const Footer = () => {
    return (
        <>
            <div>
                <footer class="w-full bg-slate-800 text-slate-300 mt-16">
                    <div class="w-full px-6 py-12 md:grid-cols-4 gap-10 flex justify-around">

                        <div>
                            <h2 class="text-2xl font-bold text-white mb-3">MobiStore</h2>
                            <p>
                                Your one-stop shop for the latest smartphones for best deals from top brands.
                            </p>
                            <p><strong>Email : </strong> manojkumar18102006@gmail.com</p>
                            <p><strong>Phone : </strong>+91 9345703845</p>
                            <p><strong>Website : </strong>www.mobistore.com</p>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
                            <ul class="space-y-2 text-sm">
                                <li><Link to="/" class="hover:text-white transition">Home</Link></li>
                                <li><Link to="/products" class="hover:text-white transition">Products</Link></li>
                                <li><Link to="#" class="hover:text-white transition">New Arrivals</Link></li>
                                <li><Link to="#" class="hover:text-white transition">Offers</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold text-white mb-4">Customer Support</h3>
                            <ul class="space-y-2 text-sm">
                                <li><Link to="#" class="hover:text-white transition">Contact Us</Link></li>
                                <li><Link to="#" class="hover:text-white transition">FAQs</Link></li>
                                <li><Link to="#" class="hover:text-white transition">Shipping & Returns</Link></li>
                                <li><Link to="#" class="hover:text-white transition">Warranty</Link></li>
                            </ul>
                        </div>

                    </div>

                    <div class="border-t border-slate-500">
                        <div class="max-w-7xl mx-auto px-6 py-4 flex flex-row justify-between items-center">
                            <p>© 2025 MobiStore. All rights reserved.</p>
                            <div class="flex space-x-4 mt-2 md:mt-0">
                                <Link to="#" class="hover:text-white">Privacy Policy</Link>
                                <Link to="#" class="hover:text-white">Terms</Link>
                                <Link to="#" class="hover:text-white">Cookies</Link>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    )
}

export default Footer;