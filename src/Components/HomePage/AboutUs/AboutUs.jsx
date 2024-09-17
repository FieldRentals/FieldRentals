import React from 'react'
import './AboutUs.css'
import AboutUsImage from '../../../images/trac1.jpeg'

export default function AboutUs() {
  return (
    <div className='AboutUs'>
      <div className='HSAbout'>
                <div className='HSAboutImage'><img src={AboutUsImage} alt="AboutUSImg" /></div>
                <div className='HSAboutText'>
                    <div className='HSAboutTextTitle'>About Us</div>
                    <p>Welcome to FieldRentals, your go-to destination for reliable and high-quality farm equipment rentals. With a deep-rooted passion for agriculture and a commitment to supporting local farmers, we provide a wide range of well-maintained machinery to help you get the job done efficiently. From tractors and plows to harvesters and more, our equipment is designed to meet the diverse needs of modern farming.</p>
                        <p>Our mission is simple: to offer top-notch equipment at competitive prices, backed by exceptional customer service. Whether you’re a seasoned farmer or a weekend hobbyist, our easy-to-use rental platform ensures a seamless experience from booking to delivery. Trust FieldRentals to equip you with the tools you need for success, and let us help you cultivate excellence on your farm.</p>
                   
                </div>
    </div>
    </div>
  )
}
