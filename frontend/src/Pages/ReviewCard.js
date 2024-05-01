import React from 'react';
import { Rating } from '@material-ui/lab';

const ReviewCard = ({ review }) => {

  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };


  return (


    <div>

      <div class="card border-0 shadow-lg rounded-0 my-2">
        <div class="card-body">
          <p className='mb-0 pb-1'>{review.name}</p>
          <Rating {...options} />
          <span>{review.comment}</span>
        </div>
      </div>


    </div>
  )
}

export default ReviewCard