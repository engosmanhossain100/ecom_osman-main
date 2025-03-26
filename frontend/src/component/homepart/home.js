 "use client"
 import axios from 'axios'
import { useEffect, useState } from 'react'
import Container from '../container/Container'
import FooterElements from './footerelements'
import HomeTopBar from './hometopbar'
import Toprateproduct from './toprateproduct'
import Category from './category'
import Hero from './heropart'
import NewArraivals from './newArraivals'
import FlashSale from './flashsale'
import Companyname from './companyname'
import Quality from './quality'
import Collection from './collection'

 function Homepart() {
 const [time, setTime] = useState();

useEffect(()=>{
  function getData (){
    axios.get("http://localhost:8000/api/v1/product/flashsale").then((data)=>{
      setTime(data.data.time)
    })
  }
  getData()
},[])


  
  return (
    <div>
      <Container>
        
        
        <HomeTopBar />
        <Hero  />
        <Category />
        <NewArraivals />
        {/* <FlashSale time={time} /> */}
        <Companyname />
        <Quality />
        <Collection />
        {/* <FlashSale time={data[0]?.time}/>  */}
        <Toprateproduct/>

      </Container>
      <FooterElements />
    </div>
  )
}

export default Homepart
