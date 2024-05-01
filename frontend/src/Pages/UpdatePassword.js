import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from '../actions/UserAction';
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from '../constants/UserConstants';
import MetaData from './MetaData';

const UpdatePassword = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isUpdated } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password Updated Successfully");
            
            navigate('/account');

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, error, alert, isUpdated]);


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };

    return (
        <div>
        <MetaData title="Change Password" />
        <h1 className='bg-light text-center py-2'>Update Password</h1>
            <div className="container pb-5 mb-5">
                <div className="row mb-5 pb-5 pt-5">
                    <div className="col-lg-8 text-light good">
                    </div>
                    <div className="col-lg-4 py-3 card ms-5 bg-light crr">

                        <form className="text-center mt-3" onSubmit={updatePasswordSubmit}>

                        <div class="mb-3">
                                <i className="fas fa-unlock-alt"></i>
                                <input type='password'
                                    className='ms-3 w-75 border-0 shadow-lg px-3 py-2'
                                    placeholder='Old Password'
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div class="mb-3">
                                <i className="fas fa-unlock-alt"></i>
                                <input type='password'
                                    className='ms-3 w-75 border-0 shadow-lg px-3 py-2'
                                    placeholder='New Password'
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
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
                                    value="Change Password"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword