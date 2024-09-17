import React, { useState } from 'react'
import './Profile.css'

export default function Profile({setShowProfile}) {

    const [mainContent, setMainContent] = useState('Personal Information')

  return (
    <div className='ProfileContainer'>
      <div className='ProfileBackground' onClick={()=>setShowProfile(false)}/>
      <div className='ProfileSubContainer'>
        <div className='ProfileSubContainerSideBar'>
            <h2>Profile</h2>
            <button className={mainContent === 'Personal Information' ? 'active' : null} onClick={()=>setMainContent('Personal Information')}>Personal Information</button>
            <button className={mainContent === 'Rental History' ? 'active' : null} onClick={()=>setMainContent('Rental History')}>Rental History</button>
            <button className={mainContent === 'Payment Information' ? 'active' : null} onClick={()=>setMainContent('Payment Information')}>Payment Information</button>
            <button className={mainContent === 'Equipment Inventory' ? 'active' : null} onClick={()=>setMainContent('Equipment Inventory')}>Equipment Inventory</button>
            <button className={mainContent === 'Review and Ratings' ? 'active' : null} onClick={()=>setMainContent('Review and Ratings')}>Review and Ratings</button>
            <button className={mainContent === 'Account Settings' ? 'active' : null} onClick={()=>setMainContent('Account Settings')}>Account Settings</button>
            <button className={mainContent === 'Support and Help' ? 'active' : null} onClick={()=>setMainContent('Support and Help')}>Support and Help</button>
        </div>
        <div className='ProfileSubConatinerMainInfo'>
            <div className='ProfileSubConatinerMainInfoTitle'>
                <h2>{mainContent}</h2>
            </div>
        </div>
      </div>

    </div>
  )
}
