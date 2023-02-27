import React, { useContext, useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { ThemeContext } from '../GlobalComponents/ThemeProvider';
import { BiSun, BiMoon, BiCart} from 'react-icons/bi';
import { VscAccount } from 'react-icons/vsc';
//import { Link } from "@reach/router";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";


const Header = () => {
    const { theme, setThemeMode } = useContext(ThemeContext); 
    const [darkMode, setDarkMode] = useState(theme);

    const [dataUserName,SetDataUserName]=useState('')
    useEffect(()=>{
        setThemeMode(darkMode);
        console.log(darkMode)

        var user= localStorage.getItem("username")
        console.log("user" ,user)
        SetDataUserName(user)
    },[dataUserName
    ]);

    

    const {
        isEmpty,
        totalItems,
    } = useCart();

    return (
        <Navbar collapseOnSelect expand="md"
                variant={darkMode? 'dark':'#dd0285'}
              
                style={{ width: '100%', position: 'fixed', zIndex: 100,backgroundColor:'#dd0285'}}
        >
        <Container>
          <Link to="/">
            <Navbar.Brand className={darkMode? 'text-dark-primary': 'text-light-primary'}>
                <b>Fast But</b>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link
               to="/sign" 
               className={`nav-link ${darkMode? 'text-dark-primary' : 'text-light-primary'}`}>
                Sign in
              </Link>

              <Link
               to="/administration" 
               className={`nav-link ${darkMode? 'text-dark-primary' : 'text-light-primary'}`}>
                Administration
              </Link>
            
              <Link
                to="/cart"
                className={`${darkMode? 'text-dark-primary': 'text-light-primary'} d-flex align-items-center`}
              >
                <BiCart size="2rem"/>
                {!isEmpty && <span style={{ position: 'relative', left: '-21px', top: '-18px'}}>{totalItems}</span>}
                <span style={{ marginLeft: !isEmpty ? '-13px': 0}}>&nbsp;Cart</span>
              </Link>
              <Link  className={`nav-link ${darkMode? 'text-dark-primary': 'text-light-primary'}`}>
                  {dataUserName}
                  &nbsp;
                  <VscAccount size="1.8rem"/>
                  &nbsp;
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default Header;