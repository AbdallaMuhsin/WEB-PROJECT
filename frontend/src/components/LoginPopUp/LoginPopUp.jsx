import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"

const LoginPopUp = ({setShowLogin}) => {



    const {url,setToken} = useContext(StoreContext)

    const [currState,setCurrState] = useState("Login")

    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
      event.preventDefault()
      let newUrl = url;
      if (currState==='Login') {
        newUrl += "/api/user/login"
      }
      else {
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl,data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)
      }
      else {
        alert(response.data.message)
      }

    }

    
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currState==="Login"?<></>:<input name='name' onChange={onChangHandler} value={data.name} type="text" placeholder='Your name' required/>}
            
            <input name='email' onChange={onChangHandler} value={data.email} type="email" placeholder='Your email' required/>
            <input name='password' onChange={onChangHandler} value={data.password} type="password" placeholder='password' required/>
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing, I agree to the term of use & privacy policy</p>
        </div>
        {currState==="Login"
        ?<p>create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have account <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
        
      </form>
    </div>
  )
}

export default LoginPopUp
