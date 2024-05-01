import React, { useEffect } from 'react';
import { clearErrors, getProduct } from '../actions/ProductAction';
import { useSelector, useDispatch } from 'react-redux';
import Product from './Product';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import MetaData from './MetaData';

const Pro = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { products, error } = useSelector((state) => state.products);
    const { keyword } = useParams();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword));
    }, [dispatch, keyword, error, alert]);


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!products || products.length === 0) {
        return <div className='bg-light text-primarey fs-1 text-center my-5 py-5'>No products found</div>;
    }

    return (
        <div>
            <MetaData title="PRODUCTS" />
            <div className='container'>
                <div className="row d-flex">
                    {products && products.map((product) => <Product key={product._id} product={product} />)}
                </div>
            </div>
        </div>
    );
};

export default Pro;
