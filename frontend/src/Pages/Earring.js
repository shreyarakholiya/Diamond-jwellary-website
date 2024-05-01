import React, { useEffect } from 'react'
import Product from './Product';
import { clearErrors, getProduct } from '../actions/ProductAction';
import { useSelector , useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';


const Earring = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const {error,products} = useSelector((state)=>state.products);

    useEffect(()=>{
        if(error){
            alert.error(error);
             dispatch(clearErrors());
        }
        dispatch(getProduct());
    },[dispatch, error, alert]);

    return (
        <div>
            <div className="container-fluid">
                <div className="row bg-light">
                    {/* <div className="col-lg-4 py-3 ps-4">
                        <img className='vcom rounded-5' src="Images/v3.gif" alt='one' />
                    </div> */}
                    <div className="col-lg-12">
                        <h1 className='text-primary text-center py-2'>EarRings</h1>
                    </div>
                </div>
            </div>

            <div className="container">
                   
                        {products && products.map((product) => <Product product={product} />)}
                    
            </div>
        </div>
    )
}

export default Earring