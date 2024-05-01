import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from './MetaData';
import { DataGrid } from '@material-ui/data-grid';
import Sidebar from './Sidebar';
import DeleteIcon from "@material-ui/icons/Delete";
import { clearErrors, deleteReviews, getAllReviews } from '../actions/ProductAction';
import Star from "@material-ui/icons/Star";
import { DELETE_REVIEW_RESET } from '../constants/ProductConstants';

const ProductReviews = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error: deleteError, isDeleted } = useSelector((state) => state.review);

    const { error, reviews, loading } = useSelector((state) => state.productReviews);

    const [productId, setProductId] = useState("");

   

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();

        if (!productId.trim()) {
            alert.error('Please enter a valid Product ID');
            return;
        }

        dispatch(getAllReviews(productId));
    }

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Review Deleted Successfully");
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }

    }, [dispatch, alert, error, deleteError, isDeleted, productId, navigate]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 150, flex: 0.6 },
        { field: "user", headerName: "User", maxWidth: 150, flex: 0.3 },
        { field: "comment", headerName: "Comment", maxWidth: 170, flex: 1 },
        {
            field: "rating", headerName: "Rating", type: "number", maxWidth: 120, flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                    ? "greenColor"
                    : "redColor";
            }
        },
        
    ];

    const rows = reviews ? reviews.map(item => ({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name
    })) : [];

    return (
        <div>
            <MetaData title={`ALL REVIEWS -Admin`} />
            <hr className='mb-0 pb-0' />

            <div className="row">
                <div className="col-lg-2  bg-dark ps-5">
                    <Sidebar />
                </div>
                <div className="col-lg-10 text-center">
                    <h1 className='text-center pt-2'>ALL REVIEWS</h1>
                    <form onSubmit={productReviewsSubmitHandler} encType='multipart/form-data'>
                        <div className='mb-3'>
                            <Star />
                            <input className='w-75 border-0 shadow-lg py-2 ps-3 ms-4' type='text' placeholder='Product Id' required value={productId} onChange={(e) => setProductId(e.target.value)} />
                        </div>
                        <Button id='createProductBtn' type='submit' disabled={loading || !productId.trim()}>Search</Button>
                    </form>
                    {reviews && reviews.length > 0 ? <DataGrid className='my-5 mx-5' rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                        : <h1 className='text-center pt-2'>NO REVIEWS FOUND</h1>}

                </div>
            </div>
        </div>
    )
}

export default ProductReviews;
