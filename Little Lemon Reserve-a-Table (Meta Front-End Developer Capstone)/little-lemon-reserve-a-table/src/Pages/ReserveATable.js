import './ReserveATable.css';

import restaurant from "../Assets/restaurant.jpg";

import ReservationHero from '../Components/ReservationHero'

export default function ReserveATable() {
    return (<>
        <ReservationHero headerText="Reserve a Table" photo={restaurant}/>
        <main>
            {/* TODO: May need to replace the native form elements with stuff from
            a UI framework for better customizability. See if it comes up later in
            the project. */}
            {/* TODO: Address the fact that the browser console is yelling at me
            about "value" being set for a lot of these elements, but not "onChange". */}
            <form className="ReserveForm">
                {/* TODO: Add error messages that appear when a field is invalid.
                (Might come up later in the project.) */}
                <div>
                    <label htmlFor="reservationDate" className='ParagraphText'><span className='HighlightText'>*</span>Choose a date:</label>
                    {/* TODO: Set today's date as the min and the value. */}
                    <input type="date" id="reservationDate" name="reservationDate" required className='FormField LeadText'/>
                </div>
                <div>
                    <label htmlFor="reservationTime" className='ParagraphText'><span className='HighlightText'>*</span>Choose a time:</label>
                    {/* TODO: Set the current time as the min and the value. */}
                    <input type="time" id="reservationTime" name="reservationTime" required className='FormField LeadText'/>
                </div>
                <div>
                    <label htmlFor="numOfGuests" className='ParagraphText'><span className='HighlightText'>*</span>Number of guests:</label>
                    <input type="number" id="numOfGuests" name="numOfGuests" value="1" required min="1" className='FormField LeadText'/>
                </div>
                <div>
                    <label htmlFor="seatingChoice" className='ParagraphText'>Where would you like to sit?</label>
                    <fieldset id="seatingChoice" name="seatingChoice">
                        <input type="radio" value="Inside" id="InsideRadio"/><label htmlFor="InsideRadio" className='ParagraphText'>Inside</label>
                        <input type="radio" value="Outside" id="OutsideRadio"/><label htmlFor="OutsideRadio" className='ParagraphText'>Outside</label>
                        <input type="radio" value="No Preference" id="NoPreferenceRadio" checked/><label htmlFor="NoPreferenceRadio" className='ParagraphText'>No Preference</label>
                    </fieldset>
                </div>
                <div>
                    <label htmlFor="occasion" className='ParagraphText'>Is it a special occasion?</label>
                    <select id="occasion" name="occasion" value="nothing" className='FormDropDown LeadText'>
                        <option value="nothing" className='LeadText'>Nothing special</option>
                        <option value="birthday" className='LeadText'>Birthday</option>
                        <option value="engagement" className='LeadText'>Engagement</option>
                        <option value="anniversary" className='LeadText'>Anniversary</option>
                        <option value="other" className='LeadText'>Other (Explain in "Additional comments")</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="comments" className='ParagraphText'>Additional comments? (i.e., any special isntructions or accommodations needed):</label>
                    <textarea id="comments" name="comments"/>
                </div>
                <button type="submit" className='MainButton LeadText'>Submit Reservation</button>
            </form>
        </main>
    </>);
}