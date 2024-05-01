import React from 'react'

const Trendy = () => {
  return (
    <div>
    <h1 className='bg-light text-center py-2'>Now In Trend</h1>
    <div className="continer-fluid">


    <div className="row mt-5">
        <div className="col-lg-6">
        <img alt='not' className='w-100 h-75' src="Images/t1.jpg" />
        </div>
        <div className="col-lg-6">
        <img alt='not' className='w-100 h-50' src="Images/t2.jpg" />
        <img alt='not' className='w-100 h-25' src="Images/t3.jpg" />
        </div>
    </div>
    </div>
    </div>
  )
}

export default Trendy