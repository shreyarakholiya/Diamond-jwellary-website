import React from 'react';
import { Link } from "react-router-dom";
import { Rating } from '@material-ui/lab';


const Product = ({ product }) => {
    
    const options = {
        value: product.ratings,
        readOnly : true,
        precision: 0.5, 
    };


    return (
  <>
        {/* <div className="row flx"> */}
            <div className="col-lg-4">
            <Link className='productCard' to={`/product/${product._id}`}>
                <div className="card my-5 border-0 shadow-lg border-info rounded-0">
                    {product.images && product.images[0] && (
                        <img src={product.images[0].url} alt='other' className="com card-img-top p-3" />
                    )}
                    <div className="card-body ps-4">
                        <h5 className="card-title">{product.name}</h5>
                        <div className='d-flex'>
                            <Rating {...options} /> <p className='ps-3 pt-2'>({product.numOfReviews} reviews)</p>
                        </div>
                        <h6>{product.price}</h6>
                    </div>
                </div>
               
            </Link>
            </div>
        {/* </div> */}
            
        </>


    )
}

export default Product