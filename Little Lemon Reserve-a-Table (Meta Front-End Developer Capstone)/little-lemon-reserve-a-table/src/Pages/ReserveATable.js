import './ReserveATable.css';

import restaurant from "../Assets/restaurant.jpg";

import ReservationHero from '../Components/ReservationHero'

import { useEffect } from 'react';

const seatingChoices = [
    {value: "Inside", defaultChecked: false},
    {value: "Outside", defaultChecked: false},
    {value: "No Preference", defaultChecked: true}
];

const occasions = [
    {value: "nothing", displayMsg: "Nothing special"},
    {value: "birthday", displayMsg: "Birthday"},
    {value: "engagement", displayMsg: "Engagement"},
    {value: "anniversary", displayMsg: "Anniversary"},
    {value: "other", displayMsg: 'Other (Explain in "Additional comments")'}
];

// Returns true if any of the form fields are invalid.
export function validateReserveForm(reserveInfo) {
    const currentDate = new Date(Date.now());

    return !reserveInfo.resDate ||
    reserveInfo.resDate < `${(currentDate.getFullYear()).toPrecision(4)}-${(currentDate.getMonth() + 1).toPrecision(2)}-${(currentDate.getDate()).toPrecision(2)}` ||
    !reserveInfo.availableTimes.includes(reserveInfo.resTime) ||
    !reserveInfo.resTime ||
    !reserveInfo.resGuests ||
    !parseInt(reserveInfo.resGuests) ||
    parseInt(reserveInfo.resGuests) < 1 ||
    parseInt(reserveInfo.resGuests) > 10 ||
    reserveInfo.resGuests % 1 !== 0 ||
    !reserveInfo.resSeating ||
    !seatingChoices.map(current => current.value).includes(reserveInfo.resSeating) ||
    !reserveInfo.resOccasion ||
    !occasions.map(current => current.value).includes(reserveInfo.resOccasion) ||
    (reserveInfo.resOccasion === "other" && !reserveInfo.resComments);
}

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
                    <label htmlFor="reservationDate" className='ParagraphText'><span className='HighlightText' aria-hidden>*</span>Choose a date:</label>
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
                    <label htmlFor="reservationTime" className='ParagraphText'><span className='HighlightText' aria-hidden>*</span>Choose a time:</label>
                    <select
                        id='reservationTime'
                        name='reservationTime'
                        required
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
                    <label htmlFor="numOfGuests" className='ParagraphText'><span className='HighlightText' aria-hidden>*</span>Number of guests:</label>
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
                    <label htmlFor="seatingChoice" className='ParagraphText'><span className='HighlightText' aria-hidden>*</span>Where would you like to sit?</label>
                    <fieldset
                        id="seatingChoice"
                        onChange={e => reserveInfo.setResSeating(e.target.value)}
                    >
                        {seatingChoices.map(choice =>
                            <label key={choice.value} htmlFor={choice.value.concat('Radio')} className='ParagraphText'>
                                <input
                                    type='radio'
                                    value={choice.value}
                                    id={choice.value.concat('Radio')}
                                    name='seatingChoice'
                                    required
                                    defaultChecked={choice.defaultChecked}
                                />
                                {choice.value}
                            </label>
                        )}
                    </fieldset>
                </div>
                <div>
                    <label htmlFor="occasion" className='ParagraphText'><span className='HighlightText' aria-hidden>*</span>Is it a special occasion?</label>
                    <select
                        id="occasion"
                        name="occasion"
                        required
                        className='FormDropDown LeadText'
                        value={reserveInfo.resOccasion}
                        onChange={e => reserveInfo.setResOccasion(e.target.value)}
                    >
                        {occasions.map(current =>
                            <option key={current.value} value={current.value} className='LeadText'>{current.displayMsg}</option>
                        )}
                    </select>
                </div>
                <div>
                    <label htmlFor="comments" className='ParagraphText'>{reserveInfo.resOccasion === "other" && <span className='HighlightText' aria-hidden>*</span>}Additional comments? (i.e., any special isntructions or accommodations needed):</label>
                    <textarea
                        id="comments"
                        name="comments"
                        required={reserveInfo.resOccasion === "other"}
                        className='LeadText'
                        value={reserveInfo.resComments}
                        onChange={e => reserveInfo.setResComments(e.target.value)}
                    />
                </div>
                <button type="submit" className='MainButton LeadText' disabled={validateReserveForm(reserveInfo)}>Submit Reservation</button>
            </form>
        </main>
    </>);
}