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
import { clearErrors, updateProduct, getProductDetails } from '../actions/ProductAction';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_PRODUCT_RESET } from '../constants/ProductConstants';

const UpdateProduct = () => {

    const {error, product} = useSelector((state)=> state.productDetails)
    const { loading , error:updateError, success, isUpdated } = useSelector((state) => state.product);

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [Category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Earring",
        "Necklace",
        "Bangles",
        "MangalSutra",
        "Rings"
    ];

    const { productId } = useParams();

    useEffect(()=>{
        if(product && product._id !== productId){
            dispatch(getProductDetails(productId));
        }else{
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.Category);
            setStock(product.Stock);
            setOldImages(product.images);
        }


        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Product Updated SuccessFully");
            navigate("/admin/products");
            dispatch({type: UPDATE_PRODUCT_RESET});
        }
    },[dispatch, alert, error, isUpdated, productId, product, updateError]);

    const updateProductSubmitHandler =(e)=>{
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

        dispatch(updateProduct(productId,myForm));
    };


    const updateProductImagesChange = (e) =>{
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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
                    <h1 className='text-center pt-2'>Update Product</h1>
                    <div class="card ps-3 py-4 border-0 rounded-0 shadow-lg my-5">
                        <div class="card-body">
                            <form onSubmit={updateProductSubmitHandler} encType='multipart/form-data'>
                                <div className='mb-3'>
                                    <SpellcheckIcon />
                                    <input className='w-75 border-0 shadow-lg py-2 ps-3 ms-4' type='text' placeholder='Product Name' required value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <AttachMoneyIcon />
                                    <input className='w-75 border-0 shadow-lg py-2 ps-3 ms-4' type='number' placeholder='Price' required value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <DescriptionIcon />
                                    <textarea className='w-75 border-0 shadow-lg py-2 ps-3 ms-4' cols="30" rows="1" placeholder='Product Description' required value={description} onChange={(e) => setDescription(e.target.value)}> </textarea>
                                </div>
                                <div className='mb-3'>
                                    <AccountTreeIcon />
                                    <select value={Category} className='w-75 border-0 shadow-lg py-2 ps-3 ms-4'  onChange={(e) => setCategory(e.target.value)}>
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
                                    <input className='w-75 border-0 shadow-lg py-2 ps-3 ms-4' type='number' value={Stock} placeholder='Stock' required onChange={(e) => setStock(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <input className='w-75 border-0 shadow-lg py-2 ps-5 ms-5' onChange={updateProductImagesChange} multiple type='file' name='avatar' accept='Images/*' />
                                </div>
                                <div className='mb-3'>
                                   {oldImages && oldImages.map((image, index)=>(
                                    <img className='w-25' key={index} src={image.url} alt='Old Product Preview' />
                                   ))}
                                </div>
                                <div className='mb-3'>
                                   {imagesPreview.map((image, index)=>(
                                    <img className='w-25' key={index} src={image} alt='Product Preview' />
                                   ))}
                                </div>

                                <Button id='createProductBtn' type='submit' disabled={loading ? true : false}>Update</Button>
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

export default UpdateProduct