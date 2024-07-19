import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""

  })

  const onChangeHandller = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,

    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url)
    }
    else{
      alert("error")
    }
  }

  return (
    
   <div>
     <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="mult-fields">
          <input required name='firstName' onChange={onChangeHandller} value={data.firstName} type="text" placeholder='First Name' />
          <input required  name='lastName' onChange={onChangeHandller} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandller} value={data.email} type="text" placeholder='Email Address' />
        <input required  name='street' onChange={onChangeHandller} value={data.street} type="text" placeholder='Street' />
        <div className="mult-fields">
          <input required  name='city' onChange={onChangeHandller} value={data.city} type="text" placeholder='City' />
          <input name='state' onChange={onChangeHandller} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="mult-fields">
          <input  name='zipcode' onChange={onChangeHandller} value={data.zipcode} type="text" placeholder='Zip-code' />
          <input  name='country' onChange={onChangeHandller} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandller} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Tsh {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Tsh {getTotalCartAmount()===0?0:100}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>Tsh {getTotalCartAmount()===0?0:getTotalCartAmount()}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
   </div>
  )
}

export default PlaceOrder
