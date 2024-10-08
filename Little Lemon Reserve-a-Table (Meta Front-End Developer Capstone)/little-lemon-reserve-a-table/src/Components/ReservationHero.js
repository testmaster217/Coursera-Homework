import './ReservationHero.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function ReservationHero({headerText, photo}) {
    return <header className="ReservationHero">
        <div>
            <button type="button" className="BackButton" title="Back">
                <FontAwesomeIcon icon={faArrowLeft}/>
            </button>
            <h1 className='DisplayTitle'>{headerText}</h1>
        </div>
        <img src={photo} alt=""/>
    </header>;
}