import React from 'react'
import notesImg from "../../assets/images/notesBlack.png";
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarComp() {

    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem("token-ToDo-List");
        navigate("/Login");
    }


    return <>

    <Navbar expand="lg">
        <Container>
            <Navbar.Brand href="/Home">
                <img src={notesImg} className='w-25' alt="notes" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="ms-auto">
                    <span onClick={logOut} className='cursor-pointer'>
                        Sign Out
                        {/* <i className="fa-solid fa-arrow-right-from-bracket ps-2"></i> */}
                    </span>
                </Nav>

            </Navbar.Collapse>
        </Container>
    </Navbar>
    </>
}
