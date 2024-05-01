import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import "./css/style.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import Nav from './Component/Nav';
import Home from './Pages/Home';
import Earring from './Pages/Earring';
import About from './Pages/About';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Contact from './Pages/Contact';
import Footer from './Component/Footer';
import Search from './Pages/Search';
import Pro from './Pages/Pro';
import store from "./Store";
import { loadUser } from './actions/UserAction';
import UserOption from './Pages/UserOption';
import { useSelector } from 'react-redux';
import Profile from './Pages/Profile';
import UpdateProfile from './Pages/UpdateProfile';
import UpdatePassword from './Pages/UpdatePassword';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Cart from './Pages/Cart';
import Shipping from './Pages/Shipping';
import ConfirmOrder from './Pages/ConfirmOrder';
import Confirm from './Pages/Confirm';
import MyOrders from './Pages/MyOrders';
import OrderDetails from './Pages/OrderDetails';
import Dashboard from './Pages/Dashboard';
import ProductList from './Pages/ProductList';
import NewProduct from './Pages/NewProduct';
import UpdateProduct from './Pages/UpdateProduct';
import OrderList from './Pages/OrderList';
import ProcessOrder from './Pages/ProcessOrder';
import UsersList from './Pages/UsersList';
import UpdateUser from './Pages/UpdateUser';
import ProductReviews from './Pages/ProductReviews';
import Trendy from './Pages/Trendy';

const App = () => {

  const { isAuthenticated, user } = useSelector(state => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return (
    <div>
      <BrowserRouter>

        <Nav />
        {isAuthenticated && <UserOption user={user} />}
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/earring' element={<Earring />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/search' element={<Search />} />
          <Route path='/pro' element={<Pro />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/trendy' element={<Trendy />} />

          <Route
            path='/account'
            element={isAuthenticated ? <Profile /> : <Navigate to='/login' replace />}
          />
          <Route
            path='/me/update'
            element={isAuthenticated ? <UpdateProfile /> : <Navigate to='/login' replace />}
          />
          <Route
            path='/password/update'
            element={isAuthenticated ? <UpdatePassword /> : <Navigate to='/login' replace />}
          />
          <Route
            path='/login/shipping'
            element={isAuthenticated ? <Shipping /> : <Navigate to='/login' replace />}
          />
          <Route
            path='/orders'
            element={isAuthenticated ? <MyOrders /> : <Navigate to='/login' replace />}
          />
          <Route
            path='/order/confirm'
            element={isAuthenticated ? <ConfirmOrder /> : <Navigate to='/login' replace />}
          />
          <Route
            path='/order/:id'
            element={isAuthenticated ? <OrderDetails /> : <Navigate to='/login' replace />}
          />

          {isAuthenticated && user.isAdmin && (
            <>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/products' element={<ProductList />} />
            <Route path='/admin/product' element={<NewProduct />} />
            <Route path='/admin/product/:productId' element={<UpdateProduct />} />
            <Route path='/admin/orders' element={<OrderList />} />
            <Route path='/admin/order/:id' element={<ProcessOrder />} />
            <Route path='/admin/users' element={<UsersList />} />
            <Route path='/admin/user/:userId' element={<UpdateUser />} />
            <Route path='/admin/reviews' element={<ProductReviews />} />
            </>
          )}

          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/products/:keyword" element={<Pro />} />
          <Route path="/success" element={<Confirm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App