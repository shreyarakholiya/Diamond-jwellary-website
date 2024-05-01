import React, { useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../actions/ProductAction';
import { getAllOrders } from '../actions/orderAction';
import { getAllUsers } from '../actions/UserAction';

const Dashboard = () => {
    const lineChartRef = useRef(null);

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();
    let outOfStock = 0;

    products && 
        products.forEach((item)=> {
            if(item.Stock === 0){
                outOfStock += 1;
            }
    });

    useEffect(()=>{
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    },[dispatch]);

    let totalAmount = 0;
    orders &&
      orders.forEach((item) => {
        totalAmount += item.totalPrice;
      });

    useEffect(() => {
        const lineChart = new Chart(lineChartRef.current, {
            type: 'line',
            data: {
                labels: ["Initial Amount", "Amount Earned"],
                datasets: [{
                    label: "TOTAL AMOUNT",
                    backgroundColor: "tomato",
                    data: [0, 2525200]
                }]
            }
        });

        return () => {
            lineChart.destroy();
        };
    }, []);

    return (
        <div>
            <hr className='mb-0 pb-0' />
            <div className="row">
                <div className="col-lg-2 bg-dark ps-5">
                    <Sidebar />
                </div>
                <div className="col-lg-10">
                    <h1 className='text-center pt-2'>Dashboard</h1>
                    <hr />
                    <h6 className='text-center bg-info py-3'>Total Amount<br />  ₹{totalAmount}</h6>
                    <div className='d-flex justify-content-center my-5'>
                        <Link className='text-decoration-none bg-light p-4 text-center rounded-circle ' to="/admin/products">
                            <h6>Product</h6>
                            <h6>{products && products.length}</h6>
                        </Link>
                        <Link className='text-decoration-none bg-light p-4 text-center rounded-circle mx-5' to="/admin/orders">
                            <h6>Orders</h6>
                            <h6>{orders && orders.length}</h6>
                        </Link>
                        <Link className='text-decoration-none bg-light p-4 text-center rounded-circle' to="/admin/users">
                            <h6>Users</h6>
                            <h6>{users && users.length}</h6>
                        </Link>
                    </div>


                    <div className="row">
                    <div className="col-lg-2">

                    </div>
                        <div className="col-lg-8 my-5">
                            <div>
                                <canvas ref={lineChartRef}></canvas>
                            </div>
                        </div>
                        <div className="col-lg-2">
                        
                    </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Dashboard;
