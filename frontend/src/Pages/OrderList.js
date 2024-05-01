import { Button } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import MetaData from './MetaData';
import { DataGrid } from '@material-ui/data-grid';
import Sidebar from './Sidebar';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteOrder, getAllOrders , clearErrors } from '../actions/orderAction';
import { DELETE_ORDERS_RESET } from '../constants/orderConstants';

const OrderList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, orders } = useSelector((state) => state.allOrders);

    const {error : deleteError, isDeleted} = useSelector((state)=>state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted){
            alert.success("Order Delete Successfully");
            navigate("/admin/orders");
            dispatch({type : DELETE_ORDERS_RESET});
        }

        dispatch(getAllOrders());
    },[dispatch, alert, error, deleteError, isDeleted]);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 250, flex: 1 },
        {
            field: "status", headerName: "Status", maxWidth: 100, flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";
            }
        },
        { field: "itemsQty", headerName: "Items Qty", type: "number", maxWidth: 150, flex: 0.3 },
        { field: "amount", headerName: "Amount", type: "number", maxWidth: 250, flex: 0.5 },
        {
            field: "actions", headerName: "Actions", minWidth: 120, flex: 0.3, type: "number", sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}><EditIcon /></Link>
                        <Button onClick={()=>deleteOrderHandler(params.getValue(params.id, "id"))}><DeleteIcon /></Button>
                    </div>
                )
            }
        }
    ];

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus
            })
        })

    return (
        <div>
            <MetaData title={`ALL ORDERS -Admin`} />
            <hr className='mb-0 pb-0' />

            <div className="row">
                <div className="col-lg-2  bg-dark ps-5">
                    <Sidebar />
                </div>
                <div className="col-lg-10">
                    <h1 className='text-center pt-2'>ALL ORDERS</h1>

                    <DataGrid className='my-5 mx-5' rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                </div>
            </div>

        </div>
    )
}

export default OrderList