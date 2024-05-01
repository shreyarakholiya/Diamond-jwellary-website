import React from 'react';
import { Link } from "react-router-dom"

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div>
    <div className="d-flex">
      <div>
        <img src={item.image} alt="carditem" className='wid my-3' />
      </div>
      <div className="div mt-3">
        <Link to={`/product/${item.product}`} className='fs-3 text-decoration-none ps-3'> {item.name}</Link>
        <h5 className='ps-3'>{`Price: ${item.price}`}</h5>
        <button className='bg-primary text-white border-0 px-3 py-1 rounded-4 ms-3' onClick={() => deleteCartItems(item.product)}>Remove</button>
      </div>
      </div>


      
    </div>
  )
}

export default CartItemCard