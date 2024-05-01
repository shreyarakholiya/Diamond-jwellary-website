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
import { clearErrors, deleteProduct, getAdminProduct } from '../actions/ProductAction';
import { DELETE_PRODUCT_RESET } from '../constants/ProductConstants';

const ProductList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, products } = useSelector((state) => state.products);

    const {error : deleteError, isDeleted} = useSelector((state)=>state.products);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
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
            alert.success("Product Delete Successfully");
            navigate("/admin/dashboard");
            dispatch({type : DELETE_PRODUCT_RESET});
        }

        dispatch(getAdminProduct());
    },[dispatch, alert, error, deleteError, isDeleted]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.5 },
        { field: "name", headerName: "Name", maxWidth: 170, flex: 1 },
        { field: "price", headerName: "Price", type: "number", maxWidth: 120, flex: 0.5 },
        {
            field: "actions", headerName: "Actions", minWidth: 120, flex: 0.3, type: "number", sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}><EditIcon /></Link>
                        <Button onClick={()=>deleteProductHandler(params.getValue(params.id, "id"))}><DeleteIcon /></Button>
                    </div>
                )
            }
        }
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name
            })
        })

    return (
        <div>
            <MetaData title={`ALL PRODUCTS -Admin`} />
            <hr className='mb-0 pb-0' />

            <div className="row">
                <div className="col-lg-2  bg-dark ps-5">
                    <Sidebar />
                </div>
                <div className="col-lg-10">
                    <h1 className='text-center pt-2'>ALL PRODUCT</h1>

                    <DataGrid className='my-5 mx-5' rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                </div>
            </div>

        </div>
    )
}

export default ProductList