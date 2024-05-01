
import React from 'react'

const Contact = () => {
    return (
        <div>
            <h1 className='bg-light text-center py-2'>Contact Us</h1>

            <div className='container py-5'>
                <div className="row">
                    <div className="col-lg-12 conrel">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14874.315449498745!2d72.86387890577313!3d21.248542229178707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1711550297800!5m2!1sen!2sin" className='op' width="1120" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                        <div class="card border-0 shadow-lg w-25 conabv">
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Your Email" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Phone no</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Your Phone number" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Message</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div class="mb-3">
                                <button className='bg-primary text-white border-0 rounded-5 px-4 py-2'>Submit</button>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}


export default Contact