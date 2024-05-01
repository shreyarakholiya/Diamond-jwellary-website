import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword} from '../actions/UserAction';
import { useAlert } from "react-alert";
import MetaData from './MetaData'

const ForgotPassword = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, message } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);

        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
       
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
            navigate('/login');
    }}, [dispatch, error, alert, message]);

    return (
        <div>
        <MetaData title="Forgot Password" />
        <h1 className='bg-light text-center py-2'>Forget Password</h1>
        <div className="container pb-5 mb-5">
            <div className="row mb-5 pb-5 pt-5">
                <div className="col-lg-8 text-light good">
                </div>
                <div className="col-lg-4 py-3 ms-5 card bg-light crr">

                    <form className="text-center mt-3" onSubmit={forgotPasswordSubmit}>

                        <div class="mb-3">
                            <i className="fas fa-unlock-alt"></i>
                            <input type='email'
                                className='ms-3 w-75 border-0 shadow-lg px-3 py-2'
                                placeholder='Email'
                                required
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <div class="mb-3">
                            <input type='submit'
                                className='btn btn-primary my-3'
                                required
                                value="Send"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div></div>
    )
}

export default ForgotPassword