import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from './MetaData';

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products")
    }
  }

  return (
    <div>
    <MetaData title="SEARCH A PRODUCT"/>
      <form className='ser' onSubmit={searchSubmitHandler}>
          <input className='px-3 w-25 py-2 border-0 shadow-lg' type='text' placeholder='search a product...' onChange={(e) => setKeyword(e.target.value)} />
          <input className='bg-primary py-2 px-3 border-0 text-white ' type="submit" value="Search" />
      </form>
    </div>
  )
}

export default Search