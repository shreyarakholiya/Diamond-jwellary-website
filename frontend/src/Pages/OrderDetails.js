import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getOrderDetails } from '../actions/orderAction';
import { Link, useParams } from 'react-router-dom';
import MetaData from './MetaData';

const OrderDetails = () => {

    const { id } = useParams();

    const {order, error} = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(id));
    },[dispatch, alert, error, id]);

    return (
        <div>
            <MetaData title="Order Details" />
    
            <h3 className='text-center bg-light py-3 mb-5'>Order {order && order._id}</h3>
            {order && (
                <div className='container'>
                    <p>Name: {order.user && order.user.name}</p>
                    <p>Phone: {order.shippingInfo && order.shippingInfo.phoneNo}</p>
                    <p>Address: {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</p>
                    <p>Amount: {order.totalPrice && order.totalPrice}</p>
    
                    <h3 className='pt-4'>Order Status</h3>
                    <hr/>
                    <h4 className={order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                        {order.orderStatus && order.orderStatus}
                    </h4>
    
                    <h3 className='pt-4'>Order Items:</h3>
                    <hr/>
                    {order.orderItems &&
                        order.orderItems.map((item) => (
                            <div key={item.product} className='d-flex'>
                                <img className="wcon my-3" src={item.image} alt="Product" />
                                <Link className='fs-3 text-decoration-none ps-5 text-primary my-5' to={`/product/${item.product}`}>{item.name}</Link>
                                <h6 className='pt-5 mt-2 mar ps-5'>{item.quantity} X  ₹{item.price} = ₹{item.price * item.quantity}</h6>
                            </div>
                            
                        ))}
                </div>
            )}
        </div>
    )
    
}

export default OrderDetails