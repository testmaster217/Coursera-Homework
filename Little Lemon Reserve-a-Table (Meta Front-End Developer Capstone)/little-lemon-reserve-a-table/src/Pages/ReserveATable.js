import './ReserveATable.css';

import restaurant from "../Assets/restaurant.jpg";

import ReservationHero from '../Components/ReservationHero'

import { useEffect } from 'react';

export default function ReserveATable({reserveInfo, handleSubmit}) {
    useEffect(() => {
        const currentDate = new Date();
        reserveInfo.setResDate(`${(currentDate.getFullYear()).toPrecision(4)}-${(currentDate.getMonth() + 1).toPrecision(2)}-${(currentDate.getDate()).toPrecision(2)}`);
    }, []);

    return (<>
        <ReservationHero headerText="Reserve a Table" photo={restaurant} backLink="/"/>
        <main>
            {/* TODO: May need to replace the native form elements with stuff from
            a UI framework for better customizability. Alternatively, can just use
            a _lot_ of CSS. */}
            <form className="ReserveForm" role='form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="reservationDate" className='ParagraphText'><span className='HighlightText'>*</span>Choose a date:</label>
                    <input
                        type="date"
                        id="reservationDate"
                        name="reservationDate"
                        required
                        className='FormField LeadText'
                        value={reserveInfo.resDate}
                        min={reserveInfo.resDate}
                        onChange={e => {
                            reserveInfo.setResDate(e.target.value);
                            let newDate = new Date(e.target.value);
                            newDate.setDate(newDate.getDate() + 1);
                            reserveInfo.setAvailableTimes({type: "changed_date", newDate: newDate});
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="reservationTime" className='ParagraphText'>Choose a time:</label>
                    <select
                        id='reservationTime'
                        name='reservationTime'
                        className='FormDropDown LeadText'
                        value={reserveInfo.resTime}
                        onChange={e => reserveInfo.setResTime(e.target.value)}
                    >
                        {reserveInfo.availableTimes.map(timeSlot =>
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
                        max="10"
                        step="1"
                        className='FormField LeadText'
                        value={reserveInfo.resGuests}
                        onChange={e => reserveInfo.setResGuests(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="seatingChoice" className='ParagraphText'>Where would you like to sit?</label>
                    <fieldset
                        id="seatingChoice"
                        onChange={e => reserveInfo.setResSeating(e.target.value)}
                    >
                        <input
                            type="radio"
                            value="Inside"
                            id="InsideRadio"
                            name="seatingChoice"
                        /><label htmlFor="InsideRadio" className='ParagraphText'>Inside</label>
                        <input
                            type="radio"
                            value="Outside"
                            id="OutsideRadio"
                            name="seatingChoice"
                        /><label htmlFor="OutsideRadio" className='ParagraphText'>Outside</label>
                        <input
                            type="radio"
                            value="No Preference"
                            id="NoPreferenceRadio"
                            name="seatingChoice"
                            defaultChecked
                        /><label htmlFor="NoPreferenceRadio" className='ParagraphText'>No Preference</label>
                    </fieldset>
                </div>
                <div>
                    <label htmlFor="occasion" className='ParagraphText'>Is it a special occasion?</label>
                    <select
                        id="occasion"
                        name="occasion"
                        className='FormDropDown LeadText'
                        value={reserveInfo.resOccasion}
                        onChange={e => reserveInfo.setResOccasion(e.target.value)}
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
                        value={reserveInfo.resComments}
                        onChange={e => reserveInfo.setResComments(e.target.value)}
                    />
                </div>
                <button type="submit" className='MainButton LeadText' disabled={
                    !reserveInfo.resDate ||
                    reserveInfo.resDate < new Date(Date.now()).getFullYear() + "-" + (new Date(Date.now()).getMonth() + 1) + "-" + new Date(Date.now()).getDate() ||
                    !reserveInfo.resGuests ||
                    !parseInt(reserveInfo.resGuests) ||
                    parseInt(reserveInfo.resGuests) < 1 ||
                    parseInt(reserveInfo.resGuests) > 10
                }>Submit Reservation</button>
            </form>
        </main>
    </>);
}