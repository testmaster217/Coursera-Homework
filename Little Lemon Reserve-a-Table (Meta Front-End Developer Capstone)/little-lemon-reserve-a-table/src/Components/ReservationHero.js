import './ReservationHero.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

import { Link } from 'react-router-dom';

export default function ReservationHero({headerText, photo, backLink}) {
    return <header className="ReservationHero">
        <div>
            <Link to={backLink}>
                <button type="button" className="BackButton" title="Back">
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
            </Link>
            <h1 className='DisplayTitle'>{headerText}</h1>
        </div>
        <img src={photo} alt=""/>
    </header>;
}