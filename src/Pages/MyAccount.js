import React from 'react';
import { Container, Row, Col, Tab, Nav, Image, Form, Button, Badge } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import Heading from  '../components/Heading';
import profilePix from '../images/profile-picture.png';
import { FaClipboardList, FaUser } from 'react-icons/fa';
import { GiWallet} from 'react-icons/gi';
import { IoLocationSharp } from 'react-icons/io5';
import './my-account.css';
import OrderCard from '../components/OrderCard';


const MyAccount = () => {
    const [theme] = useThemeHook();
    return (
       <h1>-------</h1>
    );
};

export default MyAccount;