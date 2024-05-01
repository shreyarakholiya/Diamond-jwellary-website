import React from 'react'
import MetaData from './MetaData'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
      <MetaData title="Diamond app" />
      <div className="container-fluid">
        <div className="row back">
          <div className="col-lg-4 pt-3">
            <img className='round pb-4' src="Images/v2.gif" alt="Example GIF" />
          </div>
          <div className="col-lg-8 pt-5 ps-0">
            <h1 className='fw-bold  text-primary'>Shine bright like a <br /> diamond</h1>
            <p className='fw-bold fs-2 text-primary py-3'>Its even better when you wear it!!</p>
            {/* <button className='btn btn-primary fw-bold px-4 rounded-5 py-3'>Shop Now</button> */}
            <Link className='btn btn-primary fw-bold px-4 rounded-5 py-3' to={`/pro`}>Shop Now</Link>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-dark py-5">
        <div className="row mx-5">
          <div className="col-lg-8 ps-5 my-auto">
            <h1 className='text-primary pb-3'>Do you ever feel like</h1>
            <div className="text-primary">
              <p>Diamonds are renowned for their beauty, brilliance, and enduring value.</p>
              <p>Formed deep within the Earth over billions of years, <br />these precious gems captivate with their sparkle and allure. </p>
              <p>Whether passed down through generations or newly acquired, diamonds<br /> hold a timeless allure that transcends trends and styles</p>
            </div>

            <hr className='w-75 text-primary' />
            <h2 className='text-primary'>Then you are in the right place...</h2>

            <Link className='btn btn-primary fw-bold px-4 rounded-5 py-2 my-2' to={`/pro`}>Shop</Link>
          </div>

          <div className="col-lg-4">
            <div className="contain">
              <img alt='not' className='rsecond' src="Images/i5.jpg" />
              <img alt='not' className='rthird ' src="Images/i8.jpg" />
            </div>
          </div>
        </div>

      </div>

      <div className="container-fluid bg-success">
        <div className="row bor">
          <div className="container">
            <div className="col-lg-3 ms-5 mb-5 bg-light disc ">
              <h2 className='text-primary pt-5 ps-5 ms-4'>GET 20% OFF</h2>
              <img alt='not' className='rimg' src="Images/i2.JPG" /></div>
          </div>
          <div className="col-lg-8 mt-5">
            <div className="baju">
              <h1 className='text-white pb-3'>Gift Ideas That Last Longer</h1>
              <div className="text-white">
                <p>Looking for the perfect gift that truly dazzles? <br />Explore our curated collection of diamond gift ideas that are sure to delight your loved ones. </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container-fluid py-5 bg-dark ">
        <div className="row">
          <div className="text-center">
            <h1 className='text-primary fw-bold'>See What's popular</h1>
            <p className='text-primary'>OUR PRODUCT</p>
          </div>
          <div className="col-lg-3 text-center pt-5">
            <img alt='not' className='img4' src="Images/i4.JPG" />
            <h5 className='text-primary fw-bold pt-5'>Bracelate</h5>
            <p className='text-primary'>₹2,00,000</p>
          </div>
          <div className="col-lg-3 text-center pt-5">
            <img alt='not' className='img4' src="Images/h2.jpeg" />
            <h5 className='text-primary fw-bold pt-5'>Necklace</h5>
            <p className='text-primary'>₹5,00,000</p>
          </div>
          <div className="col-lg-3 text-center pt-5">
            <img alt='not' className='img4' src="Images/i7.JPG" />
            <h5 className='text-primary fw-bold pt-5'>Rings</h5>
            <p className='text-primary'>₹80,000</p>
          </div>
          <div className="col-lg-3 text-center pt-5">
            <img alt='not' className='img4' src="Images/h3.jpeg" />
            <h5 className='text-primary fw-bold pt-5'>Earring</h5>
            <p className='text-primary'>₹1,20,000</p>
          </div>
        </div>

      </div>

      <div className="container-fluid bg-light">
        <div className="row">
          <div className="col-lg-4">

          </div>
          <div className="col-lg-4 text-center pt-5 pb-3 text-primary mt-5 ourser">
            <h1 className='pt-4'>Our Services</h1>
            <p className='px-5 pt-4'>Discover a world of exceptional services tailored to elevate your diamond experience. 
            From expert diamond consultations to custom jewelry design, 
            our services are designed to cater to your every need. 
            Our team of experienced gemologists and craftsmen are dedicated to helping you find the perfect diamond</p>
          </div>
          <div className="col-lg-4">

          </div>
        </div>
      </div>



    </div>



  )
}

export default Home