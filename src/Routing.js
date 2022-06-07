import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import Home from './Component/Home/Home';
import Registration from './Component/Registration/Registration';
import Login from './Component/Login/Login';
import ProductDetail from './Component/ProductDetail/ProductDetail';
import Cart from './Component/Cart/Cart';
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
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing