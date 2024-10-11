import './ReserveATable.css';

import restaurant from "../Assets/restaurant.jpg";

import ReservationHero from '../Components/ReservationHero'

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ReserveATable() {
    /* TODO: Add default states for all of these based on the formats that they need to be in. */
    const [resDate, setResDate] = useState("");
    useEffect(() => {
        const currentDate = new Date();
        setResDate(`${(currentDate.getFullYear()).toPrecision(4)}-${(currentDate.getMonth() + 1).toPrecision(2)}-${(currentDate.getDate()).toPrecision(2)}`);
    }, []);
    const [availableTimes, setAvailableTimes] = useState(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
    const [resTime, setResTime] = useState(availableTimes[0]);
    const [resGuests, setResGuests] = useState(1);
    const [resSeating, setResSeating] = useState("No Preference");
    const [resOccasion, setResOccasion] = useState("nothing");
    const [resComments, setResComments] = useState("");

    return (<>
        <ReservationHero headerText="Reserve a Table" photo={restaurant} backLink="/"/>
        <main>
            {/* TODO: May need to replace the native form elements with stuff from
            a UI framework for better customizability. Alternatively, can just use
            a _lot_ of CSS. */}
            <form className="ReserveForm">
                {/* TODO: Add error messages that appear when a field is invalid.
                (Might come up later in the project.) */}
                <div>
                    <label htmlFor="reservationDate" className='ParagraphText'><span className='HighlightText'>*</span>Choose a date:</label>
                    <input
                        type="date"
                        id="reservationDate"
                        name="reservationDate"
                        required
                        className='FormField LeadText'
                        value={resDate}
                        min={resDate}
                        onChange={e => setResDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="reservationTime" className='ParagraphText'><span className='HighlightText'>*</span>Choose a time:</label>
                    {/* <input
                        type="time"
                        id="reservationTime"
                        name="reservationTime"
                        required
                        step="1800"
                        className='FormField LeadText'
                    /> */}
                    <select
                        id='reservationTime'
                        name='reservationTime'
                        className='FormDropDown LeadText'
                        value={resTime}
                        onChange={e => setResTime(e.target.value)}
                    >
                        {availableTimes.map(timeSlot =>
                            <option key={timeSlot} value={timeSlot} className='LeadText'>{timeSlot}</option>
                        )}
                    </select>
                </div>
                <div>
                    <label htmlFor="numOfGuests" className='ParagraphText'><span className='HighlightText'>*</span>Number of guests:</label>
                    <input
                        type="number"
                        id="numOfGuests"
                        name="numOfGuests"
                        required
                        min="1"
                        className='FormField LeadText'
                        value={resGuests}
                        onChange={e => setResGuests(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="seatingChoice" className='ParagraphText'>Where would you like to sit?</label>
                    <fieldset
                        id="seatingChoice"
                        onChange={e => setResSeating(e.target.value)}
                    >
                        <input
                            type="radio"
                            value="Inside"
                            id="InsideRadio"
                            name="seatingChoice"
                            // onChange={e => e.target.checked && setResSeating(e.target.value)}
                        /><label htmlFor="InsideRadio" className='ParagraphText'>Inside</label>
                        <input
                            type="radio"
                            value="Outside"
                            id="OutsideRadio"
                            name="seatingChoice"
                            // onChange={e => e.target.checked && setResSeating(e.target.value)}
                        /><label htmlFor="OutsideRadio" className='ParagraphText'>Outside</label>
                        <input
                            type="radio"
                            value="No Preference"
                            id="NoPreferenceRadio"
                            name="seatingChoice"
                            defaultChecked
                            // onChange={e => e.target.checked && setResSeating(e.target.value)}
                        /><label htmlFor="NoPreferenceRadio" className='ParagraphText'>No Preference</label>
                    </fieldset>
                </div>
                <div>
                    <label htmlFor="occasion" className='ParagraphText'>Is it a special occasion?</label>
                    <select
                        id="occasion"
                        name="occasion"
                        className='FormDropDown LeadText'
                        value={resOccasion}
                        onChange={e => setResOccasion(e.target.value)}
                    >
                        <option value="nothing" className='LeadText'>Nothing special</option>
                        <option value="birthday" className='LeadText'>Birthday</option>
                        <option value="engagement" className='LeadText'>Engagement</option>
                        <option value="anniversary" className='LeadText'>Anniversary</option>
                        <option value="other" className='LeadText'>Other (Explain in "Additional comments")</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="comments" className='ParagraphText'>Additional comments? (i.e., any special isntructions or accommodations needed):</label>
                    <textarea
                        id="comments"
                        name="comments"
                        className='LeadText'
                        value={resComments}
                        onChange={e => setResComments(e.target.value)}
                    />
                </div>
                <Link to="/reserve-page-2"><button type="submit" className='MainButton LeadText'>Submit Reservation</button></Link>
            </form>
        </main>
    </>);
}