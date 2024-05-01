import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from '../actions/UserAction';
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from '../constants/UserConstants';

const UpdateProfile = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated } = useSelector((state) => state.profile);

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/logo.png");


    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate('/account');

            dispatch({
                type : UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, error, alert, user, isUpdated]);


    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);

        dispatch(updateProfile
            (myForm));
    };


    const updateProfileDataChange = (e) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
    };


    return (
        <div>
 <div className="container pb-5 mb-5">
                <div className="row mb-5 pb-5 pt-5">
                    <div className="col-lg-8 text-light good">
                        <h1 className='p-5 ms-5'>UPDATE PROFILE</h1>
                    </div>
                    <div className="col-lg-4 py-3 card bg-light cr">

                        <form className="text-center mt-3" encType="multipart/form-data" onSubmit={updateProfileSubmit}>

                            <div class="mb-3">
                                <i className="far fa-envelope"></i>
                                <input type='text'
                                    className='ms-3 w-75 border-0 shadow-lg px-3 py-2'
                                    placeholder='Name'
                                    required
                                    name='name'
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                            <div class="mb-3">
                                <i className="fas fa-unlock-alt"></i>
                                <input type='email'
                                    className='ms-3 w-75 border-0 shadow-lg px-3 py-2'
                                    placeholder='Email'
                                    required
                                    name='email'
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <div class="mb-3">
                                <img src={avatarPreview} alt='Avtar Preview' className='w-25 mb-3'/>
                                <input type='file'
                                    className='ms-3 w-75 border-0 shadow-lg px-3 py-2'
                                    name="avatar"
                                    accept='Images/*'
                                    onChange={updateProfileDataChange}
                                />
                            </div>
                            <div class="mb-3">
                                <input type='submit'
                                    className='btn btn-primary my-3'
                                    required
                                    value="updateProfile"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile