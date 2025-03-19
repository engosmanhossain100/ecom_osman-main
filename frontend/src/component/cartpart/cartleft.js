'use client'
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";

async function getData() {
    let data = await fetch('http://localhost:8000/api/v1/product/allcart')
    .then((res)=>
    res.json()
    )

    return data;
  }
function Cartleft() {

    const [count, setCount] = useState(0)
    const [cartData, setCartData] = useState([])
    const [update, setUpdate] = useState(true)


    const handleMinus = (id,quantity) => {

          // POST request using fetch()
          fetch(`http://localhost:8000/api/v1/product/cart?type=minus`, {
            
            // Adding method type
            method: "POST",
            
            // Adding body or contents to send
            body: JSON.stringify({
                productId: id,
                userId: "673b9a729b7650570f6feab7",
            quantity:  1
            }),
            
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        
        // Adding headers to the request
        .then(response => response.json())

        // Updating the cart count
        .then(json => setCount(count > 0 ? count-1 : quantity-1))

        
        setCount(count - 1)
        if (count == 0) {
            setCount(0)
        }
    }

    const handlePlas = (id,quantity) => {

                // POST request using fetch()
                fetch(`http://localhost:8000/api/v1/product/cart?type=plus`, {
            
                    // Adding method type
                    method: "POST",
                    
                    // Adding body or contents to send
                    body: JSON.stringify({
                        productId: id,
                        userId: "673b9a729b7650570f6feab7",
                    quantity:  1
                    }),
                    
                    // Adding headers to the request
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                    
                })

                                    // Adding headers to the request
                                    .then(response => response.json())

                                    // Updating the cart count
                                    .then(json => setCount(count > 0 ? count+1 : quantity+1))


        // setCount(count + 1)
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

            const data = fetch('http://localhost:8000/api/v1/product/allcart').then((res) => {
                    res.json().then((data) => {

                        setCartData(data)
                        
                    })
                }

                )
        }
        allcart()
    }, [update])

    return (
        <div className='cart-left-part'>

            <div className='chec-box'>
                <input type='checkbox' id='select' />
                <label htmlFor='select'>Select All</label>
            </div>
            
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
                                <p>{item.productId.discount}</p>
                                <p>Total {count > 0 ? count*item.productId.discount : item.quantity*item.productId.discount }</p>
                                <div className='count'>
                                    <div className='minus' onClick={()=>handleMinus(item.productId,item.quantity)}>-</div>
                                    <div className='numbers'>{count ? count : item.quantity}</div>
                                    <div className='plass' onClick={()=>handlePlas(item.productId,item.quantity)}>+</div>
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
