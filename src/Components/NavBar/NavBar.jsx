import './NavBar.css'


function NavBar({setShowProfile}) {
    
    return (
        <>
            <div className="container" >
                <div className="navHead" id='1'>FieldRentals</div>
                <div className="navText" id='2'>
                    <button>Home</button> 
                    <button>About Us</button> 
                    <button>Service</button> 
                    <button>Collection</button> 
                </div> 
                <div className='NavBarSign'>
                    <button onClick={()=>setShowProfile(true)}>Sign Up/Login</button>
                </div>
            </div>

        </>
    )
}

export default NavBar;