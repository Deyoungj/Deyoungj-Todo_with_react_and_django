import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';
  

function Navbar() {
    return (
        <div>

        <MDBNavbar light bgColor='light' className='mb-3'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>Todo App</MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
        </div>
    );
}

export default Navbar;