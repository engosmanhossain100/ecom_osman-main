'use client'
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import Link from 'next/link';


// async function getData() {
//     let data = await fetch('http://localhost:8000/api/v1/product/allcart')
//     .then((res)=>
//     res.json()
//     )

//     return data;
//   }

function Cartleft({cartTotal, setCartTotal}) {

    let [count, setCount] = useState([])
    let [cartData, setCartData] = useState([])
    let [update, setUpdate] = useState(true)
    let [check, setCheck] = useState(false)

    
    useEffect(() => {
        const total = cartData.reduce((acc,item)=>{ 
            const itemCount = count.find(pitem=>pitem.id == item.productId._id)?.count ?? item.quantity
            return acc + itemCount * item.productId.discount
        },0)
        setCartTotal(total)
    },[cartData,count])

    
    let handleUpdateCount = (id,quantity,type) => {
        
        setCount(prevCount => {
            let updatedCount = [...prevCount]
            let itemIndex = updatedCount.findIndex((item)=>item.id === id)
            if(itemIndex !== -1){
                        updatedCount[itemIndex] = {
                            ...updatedCount[itemIndex],
                            count: type === "plus" ? updatedCount[itemIndex].count+1 : updatedCount[itemIndex].count-1
                        }
                }else{
                    updatedCount.push({
                        id:id,
                        count:1
                    })
                }
            return updatedCount
        })
      }

    const handleMinus = (id,quantity) => {

        fetch(`http://localhost:8000/api/v1/product/cart?type=minus`, {
            method: "POST",
            body: JSON.stringify({
                productId: id,
                userId: "673b9a729b7650570f6feab7",
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            
        })

        .then(response => response.json())
        .then(json => handleUpdateCount(id,quantity,"minus"))
        

        
        // setCount(count - 1)
        // if (count == 0) {
        //     setCount(0)
        // }
    }

    const handlePlas = (id,quantity) => {

                fetch(`http://localhost:8000/api/v1/product/cart?type=plus`, {
                    method: "POST",
                    body: JSON.stringify({
                        productId: id,
                        userId: "673b9a729b7650570f6feab7",
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                    
                })

                .then(response => response.json())
                .then(json => handleUpdateCount(id,quantity,"plus"))
                
                                
    }

    let handleDelete = (id) => {

        fetch(`http://localhost:8000/api/v1/product/deletecart/${id}`)

                            // Adding headers to the request
                            .then(response => response.json())

                            // Updating the cart count
                            .then(json => setUpdate(!update))
                        }


    useEffect(() => {
        function allcart() {

           fetch('http://localhost:8000/api/v1/product/allcart').then((res) => res.json())
                      .then((data) => {

                        setCartData(data)

                        // console.log(data);
                        
                        const initialCount = data.map(item=>({id:item.productId._id, count:item.quantity}))
                        setCount(initialCount)
                    })
                }
        allcart()
    }, [update])


    return (
        <div className='cart-left-part'>

            <div className='chec-box'>
                <input type='checkbox' id='select' />
                <label htmlFor='select'>Select All</label>
            </div>

            <h1>All Total: {cartTotal}$</h1>
            
            
            {
                cartData.map((item, i) => (
                    <div className='cart-items' key={i}>

                        <div className='select'>
                            <input type='checkbox' id='select' />
                        </div>

                        <div className='details'>

                            <div className='cart-imgs'>
                                <img src={`http://localhost:8000${item.productId.image[0]}`} width={130} height={130} alt='cart-img' />
                            </div>

                            <div className='item-name-price'>
                                <h3>{item.productId.name}</h3>
                                <p>discount Price: {item.productId.discount}$</p>
                                <p>Total Price: {(count.find(pitem=>pitem.id == item.productId._id)?.count ?? item.quantity) * item.productId.discount}$</p>
                                <div className='count'>
                                    <div className='minus' onClick={()=>handleMinus(item.productId._id,item.quantity)}>-</div>
                                    <div className='numbers'>{count.find(pitem=>pitem.id == item.productId._id)?.count ?? item.quantity}</div>
                                    <div className='plass' onClick={()=>handlePlas(item.productId._id,item.quantity)}>+</div>
                                </div>
                            </div>
                       
                       
                        </div>

                        <div className='cross'>
                            <RxCross2 onClick={()=>handleDelete(item._id)} className='cros-mark' />
                        </div>
                        
                    </div>
                ))
            }
        </div>
    )
}

export default Cartleft
