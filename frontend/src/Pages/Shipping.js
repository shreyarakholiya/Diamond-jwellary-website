import React, { useState } from 'react';
import { saveShippingInfo } from '../actions/cartAction';
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from './MetaData';
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone Number should be 10 digits long");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        );
        navigate("/order/confirm");
    }

    return (
        <div>
            <MetaData title="Shipping Details" />
            <CheckoutSteps activeStep={0} />

            <div className="row">
                <div className="col-lg-4">

                </div>
                <div className="col-lg-4 mb-4">
                    <div className="card my-3 border-0 shadow-lg rounded-0">
                    <h3 className="text-center py-4">Shipping Details</h3>
                        <div className="card-body  ps-5 py-2 ">
                            
                            <form encType='multipart/form-data' onSubmit={shippingSubmit}>
                                <div className='mb-3'>
                                    <HomeIcon />
                                    <input className='rounded-0 px-2 border-0 shadow-lg py-2 w-75  ms-3' type='text' placeholder='Address' required value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <LocationCityIcon />
                                    <input className='rounded-0 px-2 border-0 shadow-lg py-2 w-75  ms-3' type='text' placeholder='City' required value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <PinDropIcon />
                                    <input className='rounded-0 px-2 border-0 shadow-lg py-2 w-75  ms-3' type='number' placeholder='Pincode' required value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <PhoneIcon />
                                    <input className='rounded-0 px-2 border-0 shadow-lg py-2 w-75  ms-3' type='number' placeholder='Phone Number' required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} size="10" />
                                </div>
                                <div className='mb-3'>
                                    <PublicIcon />
                                    <select className='rounded-0 px-2 border-0 shadow-lg py-2 w-75  ms-3' required value={country} onChange={(e) => setCountry(e.target.value)}>
                                        <option value="">Country</option>
                                        {Country && Country.getAllCountries().map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {country && (
                                    <div>
                                        <TransferWithinAStationIcon />
                                        <select className='rounded-0 px-2 border-0 shadow-lg py-2 w-75  ms-3' required value={state} onChange={(e) => setState(e.target.value)}>
                                            <option value="">State</option>
                                            {State && State.getStatesOfCountry(country).map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <input type='submit' value="Continue" className='btn btn-primary mt-5 mb-4 btnship' disabled={state ? false : true} />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">

                </div>
            </div>




        </div>
    )
}

export default Shipping