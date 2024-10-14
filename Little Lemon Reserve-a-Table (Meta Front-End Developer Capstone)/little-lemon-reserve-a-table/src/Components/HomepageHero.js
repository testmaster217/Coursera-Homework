import './HomepageHero.css';

import food from "../Assets/restauranfood.jpg";

import { Link, useNavigate } from 'react-router-dom';

export default function HomepageHero() {
    const navigate = useNavigate();

    return <header className="HomepageHero">
        <div>
            <h1 className='DisplayTitle'>Little Lemon</h1>
            <h2 className='Subtitle'>Chicago</h2>
            <p className='ParagraphText'>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
            <button type="button" className='MainButton LeadText' onClick={() => navigate("/reserve-a-table")}>Reserve a table</button>
        </div>
        <img src={food} aria-hidden/>
    </header>;
}