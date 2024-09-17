import React from 'react'
import './Footer.css'
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer(){
  return (
    <div className='FooterBox'>
      <div className='FooterContainer'>
            <div className='FooterConatinerTitle'>FieldRentals</div>
            <div className='FooterConatinerMid'>
                <div className='FooterContainerMidText'>Terms</div>
                <div className='FooterContainerMidText'>Privacy Policy</div>
                <div className='FooterContainerMidText'>Legal Notice</div>
                <div className='FooterContainerMidText'>Accesibility</div>
            </div>
            <div className='FooterConatinerIcons'>
                <img src={YouTubeIcon} alt="yt" />
                <img src={FacebookIcon} alt="fb" />
                <img src={XIcon} alt="X" />
                <img src={InstagramIcon} alt="Insta" />
                <img src={LinkedInIcon} alt="LiIn" />
            </div>
      </div>
    </div>
  )
}

export default Footer
