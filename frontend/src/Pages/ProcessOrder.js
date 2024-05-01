import React, { useEffect, useState } from 'react';
import MetaData from './MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails, updateOrder } from '../actions/orderAction';
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from '@material-ui/core';
import { UPDATE_ORDERS_RESET } from '../constants/orderConstants';

const ProcessOrder = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    // const navigate = useNavigate();
    const { id } = useParams();

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(id, myForm));
    };
    

    const [status, setStatus] = useState("");


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({ type: UPDATE_ORDERS_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);


    return (
        <div className='bg-light'>
            <MetaData title="Process Order" />

            <hr className='mb-0 pb-0' />
            <div className="row">
                <div className="col-lg-2 bg-dark ps-5">
                    <Sidebar />
                </div>
                <div className="col-lg-10">
                    <div className="container">
                        <div className="row pt-5">
                            <div className="col-lg-7">
                                <h3 className='text-center bg-light py-3 mb-5'>Order {order && order._id}</h3>
                                <div
                                    className="confirmOrderPage"
                                    style={{
                                        display: order && order.orderStatus === "Delivered" ? "block" : "grid",
                                    }}
                                ></div>
                                <h4>Shipping Info</h4>
                                <hr />
                                {order && order.shippingInfo && (
                                    <>
                                        {/* <p>Name: {order.user.name}</p> */}
                                        <p>Phone: {order.shippingInfo && order.shippingInfo.phoneNo}</p>
                                        <p>Address: {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</p>
                                    </>
                                )}

                                <div>
                                    <h4 className='pt-5'>Order Status</h4>
                                    <hr />
                                    <h4
                                        className={
                                            order && order.orderStatus === "Delivered"
                                                ? "greenColor"
                                                : "redColor"
                                        }
                                    >
                                        {order && order.orderStatus}
                                    </h4>
                                </div>
                                <h4 className='pt-5'>Your Cart Items</h4>
                                <hr />
                                {order && order.orderItems &&
                                    order.orderItems.map((item) => (
                                        <div key={item.product} className='d-flex'>

                                            <img className="wcon my-3" src={item.image} alt="Product" />

                                            <Link className='fs-3 text-decoration-none ps-5 text-primary my-5' to={`/product/${item.product}`}>{item.name}</Link>
                                            <h6 className='pt-5 mt-2 btnship ps-5'>{item.quantity} X  ₹{item.price} = ₹{item.price * item.quantity}</h6>
                                        </div>
                                    ))}
                            </div>
                            <div style={{display : order && order.orderStatus === "Delivered" ? "none" : "block"}} className="col-lg-5">
                                <div class="card border-primary border-2 rounded-0 shadow-lg mt-5 ms-5 ">
                                    <div class="card-body">
                                        <h3 className='text-center py-3'>Process Order</h3>
                                        <form onSubmit={updateOrderSubmitHandler} encType='multipart/form-data'>


                                            <div className='mb-3 ps-3'>
                                                <AccountTreeIcon />
                                                <select className='w-75 border-0 shadow-lg py-2 ps-3 ms-4' onChange={(e) => setStatus(e.target.value)}>
                                                <option value="">Choose Category</option>
                                                    {order && order.orderStatus === "Processing" && (
                                                        <option value="shipped">Shipped</option>
                                                    )}
                                                    {order && order.orderStatus === "shipped" && (
                                                        <option value="Delivered">Delivered</option>
                                                    )}
                                                </select>
                                            </div>
                                            <Button
                                                id="createProductBtn"
                                                type="submit"
                                                disabled={
                                                    loading ? true : false || status === "" ? true : false
                                                }
                                            >
                                                Process
                                            </Button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessOrder;
