import React, { useEffect, useState } from 'react'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedeUserIcon from "@material-ui/icons/VerifiedUser";
import MetaData from './MetaData';
import Sidebar from './Sidebar';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../constants/UserConstants';
import { getUserDetails, updateUser , clearErrors } from '../actions/UserAction';

const UpdateUser = () => {

    const { error, user } = useSelector((state) => state.userDetails);
    const { loading:updateLoading, error:updateError, isUpdated } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    
    const { userId } = useParams();
    
    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
    
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
    
        if (isUpdated) {
            alert.success("User Updated Successfully");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, isUpdated, updateError, user, userId]);
    
    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email); 
        myForm.set("role", role);
    
        dispatch(updateUser(userId, myForm));
    };
    

    return (
        <div>
            <MetaData title="Update User" />
            <hr className='mb-0 pb-0' />
            <div className="row">
                <div className="col-lg-2 bg-dark ps-5">
                    <Sidebar />
                </div>
                <div className="col-lg-3">

                </div>
                <div className="col-lg-4">
                    <h1 className='text-center pt-2'>Update User</h1>
                    <div class="card ps-3 py-4 border-0 rounded-0 shadow-lg my-5">
                        <div class="card-body">
                            <form onSubmit={updateUserSubmitHandler} encType='multipart/form-data'>
                                <div className='mb-3'>
                                    <PersonIcon />
                                    <input className='w-75 border-0 shadow-lg py-2 ps-3 ms-4' type='text' placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <MailOutlineIcon />
                                    <input value={email} className='w-75 border-0 shadow-lg py-2 ps-3 ms-4' type='email' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                
                                <div className='mb-3'>
                                    <VerifiedeUserIcon />
                                    <select value={role} className='w-75 border-0 shadow-lg py-2 ps-3 ms-4'  onChange={(e) => setRole(e.target.value)}>
                                        <option  value="">Choose Role</option>
                                        <option  value="admin">Admin</option>
                                        <option  value="user">User</option>
                                    </select>
                                </div>
                               
                                <Button id='createProductBtn' type='submit' disabled={updateLoading ? true : false || role === ""? true : false}>Update</Button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">

                </div>
            </div>
        </div>
    )
}

export default UpdateUser 