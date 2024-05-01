import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import MetaData from './MetaData';
import { useSelector } from 'react-redux';

const Profile = () => {

  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);


  return (
    <div>
      <MetaData title={`${user.name}'s Profile`} />
      <div className="row">
        <div className="col-lg-4">

        </div>
        <div className="col-lg-4">
          <div class="card border-0 rounded-0 mt-2 mb-5 shadow-lg">
            <div class="card-body">
              <h1 className='text-center bg-light py-1'>My Profile</h1>
              <div className="d-flex ">
                <img src={user.avatar.url} alt={user.name} />

                <div className='pt-2'>
                  <h4 className='pt-3'>Full Name</h4>
                  <p>{user.name}</p>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
              </div>


              <Link className='text-decoration-none btn btn-primary mt-4 mb-2' to="/me/update">Edit Profile</Link>
              <Link className='text-decoration-none btn btn-primary mt-4 mb-2 mx-4' to="/orders">My Orders</Link>
              <Link className='text-decoration-none btn btn-primary mt-4 mb-2' to="/password/update">Change Password</Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4">

        </div>
      </div>


    </div>
  )
}

export default Profile