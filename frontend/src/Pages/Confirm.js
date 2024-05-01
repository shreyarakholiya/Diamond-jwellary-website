import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MetaData from './MetaData';
import CheckoutSteps from './CheckoutSteps';

const Confirm = () => {
  return (
    <div>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={2} />
      <h1 className='text-center bg-light py-3'>Order Placed SuccessFully</h1>

      <Link className='text-text-decoration-none btn btn-primary my-4 mview' to="/orders">View Order</Link>
    </div>
  );
};

export default Confirm;
