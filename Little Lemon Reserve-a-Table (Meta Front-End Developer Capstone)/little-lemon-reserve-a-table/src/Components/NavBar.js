import './NavBar.css';

import logo from "../Assets/Logo.svg";

export default function NavBar() {
    return <nav>
        <img src={logo} alt="Little Lemon's logo"/>
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