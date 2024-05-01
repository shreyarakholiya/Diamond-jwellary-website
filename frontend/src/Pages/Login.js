import React, { useEffect, useState } from 'react';
import { Link , useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors , login } from '../actions/UserAction';
import { useAlert } from "react-alert";

const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isAuthenticated } = useSelector((state) => state.user);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword))
    };

    const location = useLocation();

    const redirect = location.search ? location.search.split("=")[1] : "/account"

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isAuthenticated){
            navigate(redirect);
        }
    },[dispatch, error, alert, isAuthenticated, redirect]);

    return (
        <div>
         <h1 className='bg-light text-center py-2'>Login</h1>
            <div className="container mb-5 pb-5">
                <div className="row mb-5 pb-5 pt-5">
                    <div className="col-lg-8 text-light lo">
                    </div>
                    <div className="col-lg-4 py-3 ms-5 card bg-light lr">
                       
                        <form className='text-center mt-3' onSubmit={loginSubmit}>

                            <div class="mb-3">
                                <i className="far fa-envelope"></i>
                                <input type='email'
                                    className='ms-3 w-75 border-0 shadow-lg px-3 py-2'
                                    placeholder='Email'
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div class="mb-3">
                                <i className="fas fa-unlock-alt"></i>
                                <input type='password'
                                    className='ms-3 w-75 border-0 shadow-lg px-3 py-2'
                                    placeholder='Password'
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>

                            <Link to="/password/forgot" className='text-center'>Forget Password ?</Link>
                            <input type='submit' value="Login" className='btn btn-primary my-3 ms-4' />
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login