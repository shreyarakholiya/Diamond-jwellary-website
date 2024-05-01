import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useAlert } from "react-alert";
import {logout} from "../actions/UserAction";
import {useDispatch, useSelector} from "react-redux";

const UserOption = ({ user }) => {

  const {cartItems} = useSelector((state)=> state.cart);
  
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCartIcon style={{color:cartItems.length>0?"green":"unset"}} />, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
  ];

if(user.role === "admin"){
  options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard },)
}

function dashboard() {
  navigate('/admin/dashboard');
}

function orders() {
  navigate('/orders');
}

function cart() {
  navigate('/cart');
}

function account() {
  navigate('/account');
}

function logoutUser() {
  dispatch(logout());
  alert.success("Logout Successfully");
}

  return (
    <div>
      <SpeedDial ariaLabel='SpeedDial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction='down'
        className='speedDial'
        icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : "/logo.png"} alt='profile' />}>

        {options.map((item)=>(
          <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>
        ))}
      </SpeedDial>

    </div>
  )
}

export default UserOption