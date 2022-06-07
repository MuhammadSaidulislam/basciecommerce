import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import Home from './Component/Home/Home';
import Registration from './Component/Registration/Registration';
import Login from './Component/Login/Login';
import ProductDetail from './Component/ProductDetail/ProductDetail';
import Cart from './Component/Cart/Cart';
import ThankYou from './Component/ThankYou/ThankYou';
const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route exact path="/login" element={<Login />}></Route>
                    <Route exact path="/register" element={<Registration />}></Route>
                    <Route exact path="/products/:id" element={<ProductDetail />}></Route>
                    <Route exact path="/cart" element={<Cart/>}></Route>
                    <Route exact path="/thankyou" element={<ThankYou/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing