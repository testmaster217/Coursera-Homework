import './HomepageHero.css';

import food from "../Assets/restauranfood.jpg";

import { Link } from 'react-router-dom';

export default function HomepageHero() {
    return <header className="HomepageHero">
        <div>
            <h1 className='DisplayTitle'>Little Lemon</h1>
            <h2 className='Subtitle'>Chicago</h2>
            <p className='ParagraphText'>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
            <Link to="/reserve-a-table"><button type="button" className='MainButton LeadText'>Reserve a table</button></Link>
        </div>
        <img src={food} alt=""/>
    </header>;
}