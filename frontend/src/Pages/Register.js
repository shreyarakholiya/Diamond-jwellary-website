import React, {  useEffect, useState } from 'react';
import { clearErrors, register } from '../actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Register = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isAuthenticated } = useSelector((state) => state.user);

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/logo.png");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = user;

    
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isAuthenticated){
            navigate('/login');
        }
    },[dispatch, error, alert, isAuthenticated]);


    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

      dispatch(register(myForm));
    };


    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
    
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
    
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (
        <div>
         <h1 className='bg-light text-center py-2'>Register</h1>
            <div className="container pb-5 mb-5">
                <div className="row mb-5 pb-5 pt-5">
                    <div className="col-lg-8 text-light good">
                    </div>
                    <div className="col-lg-4 py-3 ms-5 card bg-light cr">

                        <form className="text-center mt-3" encType="multipart/form-data" onSubmit={registerSubmit}>

                            <div class="mb-3">
                                <i className="far fa-envelope"></i>
                                <input type='text'
                                    className='ms-3 w-75 border-0 shadow-lg px-3 py-2'
                                    placeholder='Name'
                                    required
                                    name='name'
                                    value={name}
                                    onChange={registerDataChange}
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
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div class="mb-3">
                                <i className="fas fa-unlock-alt"></i>
                                <input type='password'
                                    className='ms-3 w-75 border-0 shadow-lg px-3 py-2'
                                    placeholder='Password'
                                    required
                                    name='password'
                                    value={password}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div class="mb-3">
                                <img src={avatarPreview} alt='Avtar Preview' className='w-25 mb-3'/>
                                <input type='file'
                                    className='ms-3 w-75 border-0 shadow-lg px-3 py-2'
                                    name="avatar"
                                    accept='Images/*'
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div class="mb-3">
                                <input type='submit'
                                    className='btn btn-primary my-3'
                                    required
                                    value="Register"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Register