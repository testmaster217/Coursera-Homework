import './NavBar.css';

import logo from "../Assets/Logo.svg";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

import { Link } from 'react-router-dom';

export default function NavBar() {
    return <nav>
        <div className='Icons'>
            <img src={logo} alt="Little Lemon's logo"/>
            <button type="button">
                <span className='ParagraphText'>MENU</span>
                <FontAwesomeIcon icon={faBars}/>
            </button>
        </div>
        <menu>
            <li><Link to="/" className='ParagraphText'>HOME</Link></li>
            {/* TODO: Make this link to the "About Us" section of the homepage. */}
            <li><Link to="/" className='ParagraphText'>ABOUT</Link></li>
            <li><Link to="/" className='ParagraphText'>MENU</Link></li>
            <li><Link to="/reserve-a-table" className='ParagraphText'>RESERVATIONS</Link></li>
            <li><Link to="/" className='ParagraphText'>ORDER ONLINE</Link></li>
            <li><Link to="/" className='ParagraphText'>LOGIN</Link></li>
        </menu>
    </nav>;
}