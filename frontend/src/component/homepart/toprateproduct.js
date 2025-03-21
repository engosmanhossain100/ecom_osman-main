"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import HeadName from '../headname/headname'
import Headviewall from '../headviewall/headviewall'
import Image from 'next/image'
import axios from 'axios'
import Button from '../button'


function Toprateproduct() {

    let [allproduct, setAllProduct] = useState([])

    useEffect(() => {
        function getAllProduct() {
            axios.get("http://localhost:8000/api/v1/product/allpro").then((response) => {
                setAllProduct(response.data)
            })
        }
        getAllProduct()
    }, [])

    return (
        <div className='top-product'>
            <Headviewall>
                <HeadName>Top Rated Product</HeadName>
                <p className='prdct-view'>View All</p>
            </Headviewall>
            <div className='all-prdct'>
                {
                    allproduct.map((item, i) => (

                        item.proType == "top" &&

                        <div className='prdct-item' key={i}>

                            <img width={247} height={247} style={{ borderRadius: "15px" }} src={`http://localhost:8000${item.image}`} alt="asdfa" />
                            <div className='product-text'>

                                <h4><Link href={`/pages/product/${item.slug}`}>{item.name}</Link></h4>
                                <p>demo text</p>
                                <div className='star-sold'>
                                    <img src={item.img2} width={15} height={15} alt='star' />
                                    <span>{item.discount ? <><p><del style={{ color: "red" }}>{item.regularprice}</del></p><p>{item.regularprice - item.discount}</p></> : (item.regularprice)}
                                    </span>
                                </div>

                                <div className='btn'>
                                    <Button item={item._id} />
                                    <img src='/love.png' width={24} height={24} style={{ marginLeft: "30px" }} alt='love' />
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default Toprateproduct