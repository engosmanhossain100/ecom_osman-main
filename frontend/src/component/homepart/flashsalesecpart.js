'use client'
import React from 'react'
import Images from 'next/image'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { flashsale } from './categoryData';
import Slider from "react-slick";
import Image from 'next/image';

{/* <div className='flash-sec-part'>
{flashsale.map((item, i)=>(
    <div className='sec-items'>
        <Images src={item.img} width={500} height={350} alt='flashSale' />
        <div className='flash-tag'>
            <p>{item.discount}</p>
        </div>
        <div className='flash-sec-text'>
            <h3>{item.device}</h3>
            <span className='ban-num'>{item.banname}</span>
            <span className='current-num'>{item.curname}</span>
            <div className='available-sold'>
                <p>{item.available}</p>
                <p>{item.sold}</p>
            </div>
            <ProgressBar variant="danger" now={80} />
        </div>
    </div>
))}
</div> */}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center", background: "red", width: "30px", height: '30px', borderRadius: "8px" }}
            onClick={onClick}
        />
    );
}

function Flashsalesecpart({ flashsaleProduct }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
    };
    return (
        <>

            <div className='mt-5'><Slider {...settings}>

                {
                flashsaleProduct.map((item,i) => (
                    <div key={i} className='flash-sec-part'>
                        {/* {console.log(item)} */}
                        <div className='sec-items'>
                            <a href='/pages/product'>
                                <img src={`http://localhost:8000${item.image}`} width={500} height={350} alt='flashSale' />
                            </a>
                            <div className='flash-tag'>
                                <p>{item.regularprice - item.discount} Tk Off</p>
                            </div>
                            <div className='flash-sec-text'>
                                <h3>{item.name}</h3>
                                <span className='ban-num'>{item.regularprice}$</span>
                                <span className='current-num'> - {item.discount}$</span>
                                <div className='available-sold'>
                                    <p>Available: 10</p>
                                    <p>Sold: 5</p>
                                </div>
                                <ProgressBar variant="danger" now={80} />
                            </div>
                        </div>
                    </div>

                ))}

            </Slider>
            </div>
        </>
    )
}

export default Flashsalesecpart
