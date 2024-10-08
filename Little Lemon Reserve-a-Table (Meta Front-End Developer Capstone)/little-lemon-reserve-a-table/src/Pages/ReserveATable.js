import restaurant from "../Assets/restaurant.jpg";

import ReservationHero from '../Components/ReservationHero'

export default function ReserveATable() {
    return (<>
        <ReservationHero headerText="Reserve a Table" photo={restaurant}/>
        <main>
            <form>
                <label htmlFor="reservationDate">Choose a date:</label>
                <input type="date" id="reservationDate" name="reservationDate" required/>
                
                <label htmlFor="reservationTime">Choose a time:</label>
                <input type="time" id="reservationTime" name="reservationTime" required/>

                {/* TODO: Figure out how to do the "Number of guests" field.
                Maybe I can just use a number stepper and do a heck of a lot
                of CSS to get it to look like I want it to. */}
                <label htmlFor="numOfGuests">Number of guests:</label>
                <button type="button">-</button>
                <span id="numGuests">5</span>
                <button type="button">+</button>

                <label htmlFor="seatingChoice">Where would you like to sit?</label>
                <fieldset id="seatingChoice" name="seatingChoice">
                    <input type="radio" value="Inside" id="InsideRadio"/><label htmlFor="InsideRadio">Inside</label>
                    <input type="radio" value="Outside" id="OutsideRadio"/><label htmlFor="OutsideRadio">Outside</label>
                    <input type="radio" value="No Preference" id="NoPreferenceRadio"/><label htmlFor="NoPreferenceRadio">No Preference</label>
                </fieldset>

                <label htmlFor="occasion">Is it a special occasion?</label>
                <select id="occasion" name="occasion">
                    <option value="birthday">Birthday</option>
                    <option value="engagement">Engagement</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="comments">Additional comments? (i.e., any special isntructions or accommodations needed):</label>
                <textarea id="comments" name="comments"/>

                <button type="submit">Submit Reservation</button>
            </form>
        </main>
    </>);
}