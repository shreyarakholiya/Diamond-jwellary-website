import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from '../actions/UserAction';
import { useAlert } from "react-alert";
import MetaData from './MetaData';

const ResetPassword = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();
    const { token } = useParams();

    const { error, success } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");
            
            navigate('/login');

        }
    }, [dispatch, error, alert,success]);


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token,myForm));
    };

  return (
    <div>
<MetaData title="Change Password" />
            <div className="container pb-5 mb-5">
                <div className="row mb-5 pb-5 pt-5">
                    <div className="col-lg-8 text-light good">
                        <h1 className='p-5 ms-5'>RESET PASSWORD</h1>
                    </div>
                    <div className="col-lg-4 py-3 card bg-light cr">

                        <form className="text-center mt-3" onSubmit={resetPasswordSubmit}>
                            <div class="mb-3">
                                <i className="fas fa-unlock-alt"></i>
                                <input type='password'
                                    className='ms-3 w-75 border-0 shadow-lg px-3 py-2'
                                    placeholder='New Password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div class="mb-3">
                                <i className="fas fa-unlock-alt"></i>
                                <input type='password'
                                    className='ms-3 w-75 border-0 shadow-lg px-3 py-2'
                                    placeholder='Confirm Password'
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div class="mb-3">
                                <input type='submit'
                                    className='btn btn-primary my-3'
                                    required
                                    value="reset Password"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default ResetPassword