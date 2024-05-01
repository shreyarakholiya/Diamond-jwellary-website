import React, { useEffect, useState } from 'react'
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MetaData from './MetaData';
import Sidebar from './Sidebar';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, createProduct } from '../actions/ProductAction';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../constants/ProductConstants';

const NewProduct = () => {

    const { loading , error, success } = useSelector((state) => state.newProduct);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [Category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Earring",
        "Necklace",
        "Bangles",
        "MangalSutra",
        "Rings"
    ];

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Product Created SuccessFully");
            navigate("/admin/dashboard");
            dispatch({type: NEW_PRODUCT_RESET});
        }
    },[dispatch, alert, error, success]);

    const createProductSubmitHandler =(e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", Category);
        myForm.set("Stock", Stock);

        images.forEach((image)=>{
            myForm.append("images", image);
        });

        dispatch(createProduct(myForm));
    };


    const createProductImagesChange = (e) =>{
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file)=>{
            const reader = new FileReader();

            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setImagesPreview((old) => [...old,reader.result ]);
                    setImages((old) => [...old, file]);
                }
            }

            reader.readAsDataURL(file);
        })

    }
    
    

    return (
        <div>
            <MetaData title="Create Product" />
            <hr className='mb-0 pb-0' />
            <div className="row">
                <div className="col-lg-2 bg-dark ps-5">
                    <Sidebar />
                </div>
                <div className="col-lg-3">

                </div>
                <div className="col-lg-4">
                    <h1 className='text-center pt-2'>Create Product</h1>
                    <div class="card ps-3 py-4 border-0 rounded-0 shadow-lg my-5">
                        <div class="card-body">
                            <form onSubmit={createProductSubmitHandler} encType='multipart/form-data'>
                                <div className='mb-3'>
                                    <SpellcheckIcon />
                                    <input className='w-75 border-0 shadow-lg py-2 ps-3 ms-4' type='text' placeholder='Product Name' required value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <AttachMoneyIcon />
                                    <input className='w-75 border-0 shadow-lg py-2 ps-3 ms-4' type='number' placeholder='Price' required onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <DescriptionIcon />
                                    <textarea className='w-75 border-0 shadow-lg py-2 ps-3 ms-4' cols="30" rows="1" placeholder='Product Description' required value={description} onChange={(e) => setDescription(e.target.value)}> </textarea>
                                </div>
                                <div className='mb-3'>
                                    <AccountTreeIcon />
                                    <select className='w-75 border-0 shadow-lg py-2 ps-3 ms-4'  onChange={(e) => setCategory(e.target.value)}>
                                        <option  value="">
                                            Choose Category
                                        </option>
                                        {categories.map((cate) => (
                                            <option key={cate} value={cate}>
                                                {cate}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <StorageIcon />
                                    <input className='w-75 border-0 shadow-lg py-2 ps-3 ms-4' type='number' placeholder='Stock' required onChange={(e) => setStock(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <input className='w-75 border-0 shadow-lg py-2 ps-5 ms-5' onChange={createProductImagesChange} multiple type='file' name='avatar' accept='Images/*' />
                                </div>
                                <div className='mb-3'>
                                   {imagesPreview.map((image, index)=>(
                                    <img className='w-25' key={index} src={image} alt='Avatar Preview' />
                                   ))}
                                </div>

                                <Button id='createProductBtn' type='submit' disabled={loading ? true : false}>Create</Button>
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

export default NewProduct