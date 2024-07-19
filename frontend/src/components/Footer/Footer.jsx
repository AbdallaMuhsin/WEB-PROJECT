import React from 'react'
import './Footer.css'
import { assets } from "../../assets/assets";



const Footer = () => {
  return (
    <div className='footer' id='footer'>

      <div className="footer-content">

        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti in perferendis architecto, suscipit esse commodi ullam repellendus corporis vel fugit porro excepturi nulla id illum eveniet? Molestiae delectus quidem maiores.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>

        <div className="footer-content-center">
            <h2>DULLA FOOD</h2>
            <ul>
                <li>Home</li>
                <li>Abot Us</li>
                <li>Delivery</li>
                <li>Privecy Policy</li>
            </ul>
        </div>

        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>077 480 5487</li>
                <li>dullamuhsin@gmail.com</li>
            </ul>
        </div>

      </div>

      <hr />
      <p className="footer-copyright">
        Copyright 2024 dullarestaurent.com - All Right Reserved.
      </p>

    </div>
  )
}

export default Footer
