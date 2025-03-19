'use client'
import React, { useEffect, useState } from 'react'
import HeadName from '../headname/headname'
import Headviewall from '../headviewall/headviewall'
import './style.css'
import Images from 'next/image'
import { newArraivals } from './categoryData'
import Image from 'next/image'
import axios from 'axios'

// async function getData() {
//     let data = await fetch('http://localhost:8000/api/v1/product/allpro')
//     .then((res)=>
//     res.json()
//     )
  
//     return data;
//   }
// let data = await getData();

 function NewArraivals() {

     let [newarraival, setNewArraival] = useState([])

    useEffect(() => {
        function getReview() {
            axios.get(`http://localhost:8000/api/v1/product/allpro`).then((data) => {

                setNewArraival(data.data)
        
            })
        }
        getReview()
    }, [])


  return (
    <div className='arrivals-part'>
        <Headviewall>
            <HeadName>New Arraivals</HeadName>
            <p className='view-text'>View All</p>
        </Headviewall>
        <div className='arraivals-items'>
            {
                newarraival.map((item, i)=>(

                    item.proType == "new" && 

                    <div className='items-list' key={i}>

                        <div className='items-img'>
                            <img src={`http://localhost:8000${item.image[0]}`} width={230} height={290} alt='newArraivals'/>
                            <div className='item-tag'>
                                <p>{item.proType}</p>
                            </div>
                        </div>
                        
                        <div className='item-text'>
                            <h4>{item.name}</h4>
                            <h3>100$</h3>
                            <div className='rating'>
                                <img src={item.star} width={20} height={20} alt='star'/>
                                <p>10</p>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default NewArraivals
