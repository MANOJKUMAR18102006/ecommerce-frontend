import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Cart from './components/Cart.jsx'
import {BrowserRouter, Route , Routes } from 'react-router';
import HomeLayout from './Layouts/HomeLayout.jsx';
import ProductList from './components/ProductList.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import Orders from './components/Orders.jsx';
import LoginForm from './components/LoginForm.jsx';
import AdminPage from './components/AdminPage.jsx';
import About from './components/About.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import {ToastContainer} from "react-toastify"
import SignupForm from './components/SignupForm.jsx';
import Profile from './components/Profile.jsx';
import Checkout from './components/Checkout.jsx';

createRoot(document.getElementById('root')).render(
    <>
    <ToastContainer/>
  <BrowserRouter>
        <Routes>
            <Route element={<HomeLayout />}>
                <Route path="/" element={<App />}/>
                <Route path='/products'>
                    <Route index element={<ProductList />} />
                    <Route path=':id' element={<ProductDetails/>} />
                </Route>
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignupForm />} />
             <Route path='/admin' element={<PrivateRoute><AdminPage/></PrivateRoute>} />
        </Routes>
    </BrowserRouter>
    </>
)
