import './NavBar.css';

import logo from "../Assets/Logo.svg";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

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
            <li><a href="#" className='ParagraphText'>HOME</a></li>
            <li><a href="#" className='ParagraphText'>ABOUT</a></li>
            <li><a href="#" className='ParagraphText'>MENU</a></li>
            <li><a href="#" className='ParagraphText'>RESERVATIONS</a></li>
            <li><a href="#" className='ParagraphText'>ORDER ONLINE</a></li>
            <li><a href="#" className='ParagraphText'>LOGIN</a></li>
        </menu>
    </nav>;
}