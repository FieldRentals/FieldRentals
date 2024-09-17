import { useNavigate } from 'react-router-dom';
import { StyledButton } from '../../../App';
import './NavBar.css'
// import {Button} from '@mui/material';

function NavBar({ setShowProfile }) {

    const navigate = useNavigate()

    return (
        <div className="NavBarContainer" >
            <div className="NavBarHead" >FieldRentals</div>
            <div className='NavBarButtonContainer'>
                <div className="NavBarLinks" >
                    <button>Home</button>
                    <button>About Us</button>
                    <button>Service</button>
                    <button>Collection</button>
                </div>
                <div className='NavBarSign'>
                <StyledButton variant="contained" disableElevation disableFocusRipple disableRipple onClick={()=>navigate('/login-or-register')} >Sign Up / Log In</StyledButton>                 
                    {/* <button onClick={() => setShowProfile(true)}>Sign Up/Login</button> */}
                </div>
            </div>
        </div>
    )
}

export default NavBar;