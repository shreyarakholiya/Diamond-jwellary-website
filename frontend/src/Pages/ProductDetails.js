import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../actions/ProductAction';
import ReviewCard from './ReviewCard';
import { useAlert } from 'react-alert';
import MetaData from './MetaData';
import { addItemsToCart } from '../actions/cartAction';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from "@material-ui/core";
import { Rating } from '@material-ui/lab';
import { NEW_REVIEW_RESET } from '../constants/ProductConstants';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { product, error } = useSelector((state) => state.productDetails);

    const {success, error:reviewError} = useSelector(
        (state) => state.newReview
    )

    const options = {
        size: "large",
        value: product.ratings,
        readOnly : true,
        precision: 0.5, 
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating,setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart")
    }

    const submitReviewToggle = ()=>{
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = ()=>{
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(false);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Review submitted successfully");
            dispatch({type : NEW_REVIEW_RESET})
        }

        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert, reviewError, success]);



    return (
        <div>
            <MetaData title={`${product.name}`} />
            <div class="card mt-5 mx-5 border-0 shadow-lg rounded-0">
                <div class="row g-0">
                    <div class="col-md-4">
                        {product.images &&
                            product.images.map((item, i) => (
                                <img className='CarouselImage carimg' key={item.url} src={item.url} alt={`${i} slide`} />
                            ))}
                    </div>

                    <div class="col-md-8 ps-5">
                        <div class="card-body py-4">
                            <h5 class="card-title">
                                <h2>{product.name}</h2>
                                <p className='text-muted fpro'>Product # {product._id}</p>
                            </h5>

                            <p class="card-text mb-0">Description : {product.description}</p>

                            <p class="card-text"><h1>{`₹ ${product.price}`}</h1>

                                <button onClick={decreaseQuantity}>-</button>
                                <input readOnly className='mx-3 px-2' value={quantity} type='number' />
                                <button onClick={increaseQuantity}>+</button><br />
                                <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler} className='mt-3 bg-primary border-0 text-white rounded-5 px-3 py-1'>Add To Cart</button></p>

                            <h5>
                                <Rating {...options} />
                                <span className='fpro mt-0'>({product.numOfReviews} Reviews)</span>
                            </h5>

                            <p>Status:
                                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>

                            <button onClick={submitReviewToggle} className='bg-primary border-0 text-white rounded-5 px-3 py-1'>Submit Review</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row p-5">
                <div className="col-lg-6">
                    <div class="card border-0 rounded-0 shadow-lg">
                        <div class="card-body p-0">
                            <h5 class="card-title text-center bg-light py-3">Product Description</h5>
                            <p class="card-text fcar text-muted px-5 py-3">With supporting text below as a natural lead-in to additional content.
                                With supporting text below as a natural lead-in to additional content.
                                With supporting text below as a natural lead-in to additional content.
                                With supporting text below as a natural lead-in to additional content.
                                With supporting text below as a natural lead-in to additional content
                                With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div class="card border-0 rounded-0 shadow-lg">
                        <div class="card-body p-0">
                            <h5 class="card-title text-center bg-light py-3">Reviews</h5>

                            <Dialog
                                aria-labelledby='simple-dialog-title'
                                open={open}
                                onClose={submitReviewToggle}>
                                <DialogTitle>Submit Review</DialogTitle>
                                <DialogContent><Rating onChange={(e) => setRating(e.target.value)} value={rating} size='large' />
                                    <textarea cols="30" rows="5" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                                </DialogContent>

                                <DialogActions>
                                    <Button onClick={submitReviewToggle}>Cancel</Button>
                                    <Button onClick={reviewSubmitHandler}>Submit</Button>
                                </DialogActions>
                            </Dialog>

                            {product.reviews && product.reviews[0] ? (
                                <div className='px-5 py-3'>
                                    {product.reviews &&
                                        product.reviews.map((review) => <ReviewCard review={review} />)}
                                </div>
                            ) : (<p className='px-5 py-3'>No Reviews Yet</p>)}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ProductDetails;
