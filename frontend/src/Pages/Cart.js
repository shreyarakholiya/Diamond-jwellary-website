import React from 'react'
import CartItemCard from './CartItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, removeItemsFromCart } from '../actions/cartAction';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity) => {
        const newQty = quantity + 1;
        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty < 1) return;
        dispatch(addItemsToCart(id, newQty));
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    }

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    }


    return (
        <div>
            <h1 className='bg-light py-3 text-center'>CART</h1>
            <div className="container mt-5">

                {cartItems.length === 0 ?
                    <div>
                        <h1>No Items in your cart</h1>
                        <Link to="/pro">View Products</Link></div>
                    :
                    <div>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Check</th>
                                </tr>
                            </thead>
                            <tbody>

                                {cartItems && cartItems.map((item) => (
                                    <tr>
                                        <td>
                                            <div key={item.product}>

                                                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                            </div>
                                        </td>
                                        <td>
                                        <button className='me-2 border-0 bg-primary text-white px-3' onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                                <input className='border-2 ps-3 shadow-lg' type='number' value={item.quantity} readOnly />
                                                <button className='ms-2 border-0 bg-primary text-white px-3' onClick={() => increaseQuantity(item.product, item.quantity)}>+</button>
                                            
                                        </td>
                                        <td>
                                            {item.price * item.quantity}
                                        </td>
                                        <td><button className='bg-primary text-white border-0 px-3 py-1 rounded-4' onClick={checkoutHandler}>Check Out</button></td>
                                    </tr>
                                ))}

                                    
                            </tbody>
                        </table>
                        <h4 className='text-end'>Gross Total:</h4>
                                        <h5 className='text-end pb-3'>{`${cartItems.reduce(
                                            (acc, item) => acc + item.price * item.quantity,
                                            0
                                        )}`}</h5>
                    </div>
                }
            </div>
        </div>
    )
}

export default Cart