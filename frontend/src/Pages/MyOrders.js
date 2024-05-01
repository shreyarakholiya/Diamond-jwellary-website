import React, { useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import LaunchIcon from "@material-ui/icons/Launch";
import MetaData from './MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, myOrders } from '../actions/orderAction';
import { Link } from 'react-router-dom';

const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, orders } = useSelector((state) => state.myOrders);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        {
            field: "status", headerName: "Status", minWidth: 150, flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";
            }
        },
        { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.3 },
        { field: "amount", headerName: "Amount", type: "number", minWidth: 250, flex: 0.5 },
        {
            field: "actions", headerName: "Actions", type: "number", flex: 0.3, minWidth: 130, sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                )
            }
        }];
    const rows = [];

    orders && orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        })
    })

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, alert, error]);

    return (
        <div>
            <MetaData title="My Orders" />
            <h1 className='text-center bg-light py-3 mb-5'>Orders</h1>
            <DataGrid rows={rows} columns={columns} disableSelectionOnClick autoHeight />

        </div>
    )
}

export default MyOrders