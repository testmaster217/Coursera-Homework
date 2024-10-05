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
                <input type="button">-</input>
                <span id="numGuests">5</span>
                <input type="button">+</input>

                <label htmlFor="seatingChoice">Where would you like to sit?</label>
                <fieldset id="seatingChoice" name="seatingChoice">
                    <input type="radio" value="Inside">Inside</input>
                    <input type="radio" value="Outside">Outside</input>
                    <input type="radio" value="No Preference">No Preference</input>
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

                <input type="submit">Submit Reservation</input>
            </form>
        </main>
    </>);
}