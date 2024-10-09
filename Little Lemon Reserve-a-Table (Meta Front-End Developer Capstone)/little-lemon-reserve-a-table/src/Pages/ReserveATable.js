import './ReserveATable.css';

import restaurant from "../Assets/restaurant.jpg";

import ReservationHero from '../Components/ReservationHero'

export default function ReserveATable() {
    return (<>
        <ReservationHero headerText="Reserve a Table" photo={restaurant}/>
        <main>
            <form className="ReserveForm">
                {/* TODO: Add error messages that appear when a field is invalid.
                (Might come up later in the project.) */}
                <div>
                    <label htmlFor="reservationDate"><span className='HighlightText'>*</span>Choose a date:</label>
                    {/* TODO: Set today's date as the min and the value. */}
                    <input type="date" id="reservationDate" name="reservationDate" required/>
                </div>
                <div>
                    <label htmlFor="reservationTime"><span className='HighlightText'>*</span>Choose a time:</label>
                    {/* TODO: Set the current time as the min and the value. */}
                    <input type="time" id="reservationTime" name="reservationTime" required/>
                </div>
                <div>
                    <label htmlFor="numOfGuests"><span className='HighlightText'>*</span>Number of guests:</label>
                    <input type="number" id="numGuests" label="numGuests" value="1" required min="1"/>
                </div>
                <div>
                    <label htmlFor="seatingChoice">Where would you like to sit?</label>
                    <fieldset id="seatingChoice" name="seatingChoice">
                        <input type="radio" value="Inside" id="InsideRadio"/><label htmlFor="InsideRadio">Inside</label>
                        <input type="radio" value="Outside" id="OutsideRadio"/><label htmlFor="OutsideRadio">Outside</label>
                        <input type="radio" value="No Preference" id="NoPreferenceRadio" checked/><label htmlFor="NoPreferenceRadio">No Preference</label>
                    </fieldset>
                </div>
                <div>
                    <label htmlFor="occasion">Is it a special occasion?</label>
                    <select id="occasion" name="occasion" value="nothing">
                        <option value="nothing">Nothing special</option>
                        <option value="birthday">Birthday</option>
                        <option value="engagement">Engagement</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="other">Other (Explain in "Additional comments")</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="comments">Additional comments? (i.e., any special isntructions or accommodations needed):</label>
                    <textarea id="comments" name="comments"/>
                </div>
                <button type="submit">Submit Reservation</button>
            </form>
        </main>
    </>);
}