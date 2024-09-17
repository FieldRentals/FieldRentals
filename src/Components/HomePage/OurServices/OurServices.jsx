import React from 'react'
import './OurServices.css'
import SettingImage from '../../../images/Capture-removebg-preview.png'

export default function OurServices() {
  return (
    <div className='OurServices'>
                <div className='OurServicesTitle'>Our Services</div>
                <div className='OurServicesContent'>
                    <div className='OurServicesContentE'>
                        <img src={SettingImage} alt="SettingIcon" />
                        <div className='OurServicesContentSubTitle'>Equipment Rental</div>

                        <p>Access a diverse fleet of high-quality farm machinery for rent, including tractors, combines, plows, and more. Our equipment is well-maintained and ready to handle your agricultural needs.</p>
                    </div>
                    <div className='OurServicesContentC'>
                        <img src={SettingImage} alt="SettingIcon" />
                        <div className='OurServicesContentSubTitle'>Custom Rental Solutions</div>
                        <p>Tailored rental solutions to meet your specific needs. Whether you require specialized equipment or a unique rental arrangement, we’re here to accommodate.</p>
                    </div>
                    <div className='OurServicesContentS'>
                        <img src={SettingImage} alt="SettingIcon" />
                        <div className='OurServicesContentSubTitle'>Seasonal Promotions</div>

                        <p>Special offers and discounts on equipment rentals during peak seasons or for long-term rentals.</p>
                    </div>
                </div>
    </div>
  )
}
