import React from 'react'

const About = () => {
    return (
        <div>
            <div className="container-fluid ">
                <div className="row bg-dark ps-1 pb-5">
                    <div className="col-lg-4 pt-5 ps-5">
                        <img src="images/mar2.jpg" class="rr img-fluid" alt="img" />
                        <img src="images/i5.jpg" class="hr img-fluid" alt="img" />
                    </div>
                    <div className="col-lg-3 abv">
                        <h1 className='text-success tx'>Ab<span className='text-light'>out us</span></h1>
                    </div>
                    <div className="col-lg-5 pl pt-5 mt-5">
                        <p className='text-success pt-5  mt-3'>Welcome to Diamond Haven, your premier destination for exquisite diamonds and timeless elegance. At Diamond Haven, we pride ourselves on offering an unparalleled selection of stunning diamond jewelry crafted with precision and passion.</p>
                        <p className='text-success pt-4 '> With our commitment to quality and excellence, we strive to provide every customer with a luxurious and unforgettable shopping experience. Whether you're searching for the perfect engagement ring to symbolize your eternal love or seeking a dazzling gift to celebrate life's special moments, our expert team is dedicated to helping you find the perfect piece that reflects your unique style and personality. Discover the brilliance of Diamond Haven and adorn yourself with the timeless beauty of diamonds that will sparkle for a lifetime.</p>
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-lg-12 text-success text-center pb-4 pt-5">
                        <h1>BRAND THOUGHT</h1>
                        <div className="container">
                            <div className="row pt-5">
                                <div className="col-lg-4">
                                    <div class="card bg-dark p-3 border-0 rounded-0 shadow-lg mb-5">
                                        <div class="card-body">
                                            <p class="card-text ">Combining the notion of eternity and the unmistakable glint of a diamond,
                                                this name speaks to the timeless appeal of diamonds as symbols of everlasting love and beauty.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div class="card bg-dark p-3 border-0 rounded-0 shadow-lg mb-5">
                                        <div class="card-body">
                                            <p class="card-text ">Highlighting the purity and quality of the diamonds, this name
                                                assures customers of the impeccable standards and authenticity of your jewelry.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div class="card bg-dark p-3 border-0 rounded-0 shadow-lg mb-5">
                                        <div class="card-body">
                                            <p class="card-text ">A name that evokes the unique aura and brilliance of diamonds,
                                                suggesting that each piece of jewelry has its own distinctive charm and character.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default About