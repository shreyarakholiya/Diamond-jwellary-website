import React, { useEffect } from 'react';
import CheckoutSteps from './CheckoutSteps';
import MetaData from './MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { createOrder, clearErrors } from '../actions/orderAction';
import { useAlert } from 'react-alert';

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error, success } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate('/success');
    }
  }, [dispatch, error, success, navigate]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')) || {};

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subtotal,
    taxPrice: tax,
    shippingPrice: shippingCharges,
    totalPrice: totalPrice,
  };

  const handleOrderConfirmation = (e) => {
    e.preventDefault();
    dispatch(createOrder(order));
    navigate("/success");
  };

  return (
    <div className='bg-light'>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />

      <div className="container">
        <div className="row pt-5">
          <div className="col-lg-8">
            <h4>Shipping Info</h4>
            <hr />
            <p>Name: {user.name}</p>
            <p>Phone: {shippingInfo.phoneNo}</p>
            <p>Address: {address}</p>

            <h4 className='pt-5'>Your Cart Items</h4>
            <hr />
            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product} className='d-flex'>
                  <img className="wcon my-3" src={item.image} alt="Product" />

                  <Link className='fs-3 text-decoration-none ps-5 text-primary my-5' to={`/product/${item.product}`}>{item.name}</Link>
                  <h6 className='pt-5 mt-2 btnship ps-5'>{item.quantity} X  ₹{item.price} = ₹{item.price * item.quantity}</h6>
                </div>
              ))}
          </div>
          <div className="col-lg-4">
            <div class="card border-primary border-2 rounded-0 shadow-lg mt-5 ms-5 ">
              <div class="card-body">
                <h4 className='text-center'>Order Summary</h4>
                <hr/>
                <p>Subtotal:<span className='padsum'>{subtotal}</span> </p>
                <p>Shipping Charges:<span className='padship'>{shippingCharges}</span>  </p>
                <p>GST:<span className='padgst'> {tax}</span></p>
                <hr/>
                <h6>Total: <span className='padtotal'>{totalPrice}</span></h6>

                <button className="btn btn-primary w-100 rounded-0 my-3" onClick={handleOrderConfirmation}>Confirm Order</button>
              </div>
            </div>

          </div>
        </div>

      </div>




    </div>
  );
};

export default ConfirmOrder;
