import './ReservationHero.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from 'react-router-dom';

export default function ReservationHero({headerText, photo, backLink}) {
    const navigate = useNavigate();

    return <header className="ReservationHero">
        <div>
            <button type="button" className="BackButton" title="Back" onClick={() => navigate(backLink)}>
                <FontAwesomeIcon icon={faArrowLeft}/>
            </button>
            <h1 className='DisplayTitle'>{headerText}</h1>
        </div>
        <img src={photo} alt=""/>
    </header>;
}