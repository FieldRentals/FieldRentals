import React from 'react'
import './SearchBox.css'
import { StyledButton } from '../../../App'

export default function SearchBox() {
  return (
    <div className='SearchBox'>
      <div className='HSSearchContainer'>
                <div className='HSSearchContainerE'> <h4>Equipment</h4> <button>Choose a equipment</button> </div>
                <div className='HSSearchContainerL'> <h4>Location</h4> <button>Choose a location</button> </div>
                <div className='HSSearchContainerP'> <h4>Pick Up Date</h4> <button>Choose a date</button> </div>
                <div className='HSSearchContainerD'> <h4>Drop Off Date</h4> <button>Choose a date</button> </div>
                <div className='HSSearchContainerS'>
                <StyledButton variant="contained" disableElevation disableFocusRipple disableRipple  >Search</StyledButton>
                </div>
      </div>
    </div>
  )
}
