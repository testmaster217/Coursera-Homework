import './ConfirmReservation.css';

import chef from "../Assets/restaurant chef B.jpg";

import ReservationHero from '../Components/ReservationHero'

import { useEffect } from 'react';

const states = [
    {value: "AL", accessibleValue: "Alabama"},
    {value: "AK", accessibleValue: "Alaska"},
    {value: "AZ", accessibleValue: "Arizona"},
    {value: "AR", accessibleValue: "Arkansas"},
    {value: "CA", accessibleValue: "California"},
    {value: "CO", accessibleValue: "Colorado"},
    {value: "CT", accessibleValue: "Connecticut"},
    {value: "DE", accessibleValue: "Delaware"},
    {value: "DC", accessibleValue: "D.C."},
    {value: "FL", accessibleValue: "Florida"},
    {value: "GA", accessibleValue: "Georgia"},
    {value: "HI", accessibleValue: "Hawaii"},
    {value: "ID", accessibleValue: "Idaho"},
    {value: "IL", accessibleValue: "Illinois"},
    {value: "IN", accessibleValue: "Indiana"},
    {value: "KS", accessibleValue: "Kansas"},
    {value: "KY", accessibleValue: "Kentucky"},
    {value: "LA", accessibleValue: "Louisiana"},
    {value: "ME", accessibleValue: "Maine"},
    {value: "MD", accessibleValue: "Maryland"},
    {value: "MA", accessibleValue: "Massachusetts"},
    {value: "MI", accessibleValue: "Michigan"},
    {value: "MN", accessibleValue: "Minnesota"},
    {value: "MS", accessibleValue: "Mississippi"},
    {value: "MO", accessibleValue: "Missouri"},
    {value: "MT", accessibleValue: "Montana"},
    {value: "NE", accessibleValue: "Nebraska"},
    {value: "NV", accessibleValue: "Nevada"},
    {value: "NH", accessibleValue: "New Hampshire"},
    {value: "NJ", accessibleValue: "New Jersey"},
    {value: "NM", accessibleValue: "New Mexico"},
    {value: "NY", accessibleValue: "New York"},
    {value: "NC", accessibleValue: "North Carolina"},
    {value: "ND", accessibleValue: "North Dakota"},
    {value: "OH", accessibleValue: "Ohio"},
    {value: "OK", accessibleValue: "Oklahoma"},
    {value: "OR", accessibleValue: "Oregon"},
    {value: "PA", accessibleValue: "Pennsylvania"},
    {value: "RI", accessibleValue: "Rhode Island"},
    {value: "SC", accessibleValue: "South Carolina"},
    {value: "SD", accessibleValue: "South Dakota"},
    {value: "TN", accessibleValue: "Tennessee"},
    {value: "TX", accessibleValue: "Texas"},
    {value: "UT", accessibleValue: "Utah"},
    {value: "VT", accessibleValue: "Vermont"},
    {value: "VA", accessibleValue: "Virginia"},
    {value: "WA", accessibleValue: "Washington"},
    {value: "WV", accessibleValue: "West Virginia"},
    {value: "WI", accessibleValue: "Wisconsin"},
    {value: "WY", accessibleValue: "Wyoming"}
];

function expDateIsExpired(expDate) {
    const [expMonth, expYear] = expDate.split("/");
    const expDateAsDate = new Date("20" + expYear, expMonth - 1);
    return expDateAsDate <= new Date(Date.now());
}

// Returns true if any of the fields are invalid.
export function validateConfirmForm(reserveUserInfo) {
    return !reserveUserInfo.resFirstName ||
    !reserveUserInfo.resLastName ||
    !reserveUserInfo.resEmail ||
    !reserveUserInfo.resEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) ||
    !reserveUserInfo.resCCName ||
    !reserveUserInfo.resAddress ||
    !reserveUserInfo.resCity ||
    !reserveUserInfo.resState ||
    !states.map(current => current.value).includes(reserveUserInfo.resState) ||
    !reserveUserInfo.resZip ||
    !reserveUserInfo.resCCNum ||
    !reserveUserInfo.resCCNum.match(/^\d{4}\u{0020}\d{4}\u{0020}\d{4}\u{0020}\d{4}$/u) ||
    !reserveUserInfo.resExpDate ||
    !reserveUserInfo.resExpDate.match(/^(?:0[1-9]|1[0-2])\/\d{2}$/) ||
    expDateIsExpired(reserveUserInfo.resExpDate) ||
    !reserveUserInfo.res3Digit ||
    !reserveUserInfo.res3Digit.match(/^\d{3}$/)
}

export default function ConfirmReservation({reserveUserInfo, handleSubmit}) {
    useEffect(() => {
        const currentDate = new Date();
        reserveUserInfo.setResExpDate(`${(currentDate.getMonth() + 1).toPrecision(2)}/${(currentDate.getFullYear() + 3).toPrecision(4).substring(2)}`);
    }, []);

    return (<>
        <ReservationHero headerText="Confirm your Reservation" photo={chef} backLink="/reserve-a-table"/>
        <main>
            <form className="ReserveConfirmForm" role='form' onSubmit={handleSubmit}>
                <fieldset>
                    <legend className="DisplayTitle">Contact Info</legend>
                    <label htmlFor="fName" className='ParagraphText'>
                        <span><span className='HighlightText' aria-hidden>*</span>First name:</span>
                        <input
                            type="text"
                            id="fName"
                            name="fName"
                            required
                            autoComplete='given-name'
                            className='FormField LeadText'
                            value={reserveUserInfo.resFirstName}
                            onChange={e => reserveUserInfo.setResFirstName(e.target.value)}
                        />
                    </label>
                    <label htmlFor="lName" className='ParagraphText'>
                        <span><span className='HighlightText' aria-hidden>*</span>Last name:</span>
                        <input
                            type="text"
                            id="lName"
                            name="lName"
                            required
                            autoComplete='family-name'
                            className='FormField LeadText'
                            value={reserveUserInfo.resLastName}
                            onChange={e => reserveUserInfo.setResLastName(e.target.value)}
                        />
                    </label>
                    <label htmlFor="phone" className='ParagraphText' aria-hidden>
                        Phone #:
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            autoComplete='tel'
                            className='FormField LeadText'
                            aria-label='Phone number:'
                            value={reserveUserInfo.resPhone}
                            onChange={e => reserveUserInfo.setResPhone(e.target.value)}
                        />
                    </label>
                    <label htmlFor="email" className='ParagraphText'>
                        <span><span className='HighlightText' aria-hidden>*</span>Email:</span>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='yourname@example.com'
                            required
                            className='FormField LeadText'
                            value={reserveUserInfo.resEmail}
                            onChange={e => reserveUserInfo.setResEmail(e.target.value)}
                        />
                    </label>
                </fieldset>

                <fieldset>
                    <legend className='DisplayTitle'>Billing Info</legend>
                    <label htmlFor="ccName" className='ParagraphText'>
                        <span><span className='HighlightText' aria-hidden>*</span>Name on credit card:</span>
                        <input
                            type="text"
                            id="ccName"
                            name="ccName"
                            required
                            autoComplete='cc-name'
                            className='FormField LeadText'
                            value={reserveUserInfo.resCCName}
                            onChange={e => reserveUserInfo.setResCCName(e.target.value)}
                        />
                    </label>
                    <label htmlFor="address" className='ParagraphText'>
                        <span><span className='HighlightText' aria-hidden>*</span>Address:</span>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder='123 Main St.'
                            required
                            autoComplete='billing address-line1'
                            className='FormField LeadText'
                            value={reserveUserInfo.resAddress}
                            onChange={e => reserveUserInfo.setResAddress(e.target.value)}
                        />
                    </label>
                    <label htmlFor="addressLine2" className='ParagraphText'>
                        Address line 2:
                        <input
                            type="text"
                            id="addressLine2"
                            name="addressLine2"
                            placeholder='Apt. #456'
                            autoComplete='billing address-line2'
                            className='FormField LeadText'
                            value={reserveUserInfo.resAddress2}
                            onChange={e => reserveUserInfo.setResAddress2(e.target.value)}
                        />
                    </label>
                    <label htmlFor="city" className='ParagraphText'>
                        <span><span className='HighlightText' aria-hidden>*</span>City:</span>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            autoComplete='billing address-level2'
                            className='FormField LeadText'
                            value={reserveUserInfo.resCity}
                            onChange={e => reserveUserInfo.setResCity(e.target.value)}
                        />
                    </label>
                    <label htmlFor="state" className='ParagraphText'>
                        <span><span className='HighlightText' aria-hidden>*</span>State:</span>
                        <select
                            id="state"
                            name="state"
                            required
                            className='FormDropDown LeadText'
                            autoComplete='billing address-level1'
                            value={reserveUserInfo.resState}
                            onChange={e => reserveUserInfo.setResState(e.target.value)}
                        >
                            {states.map(currentState =>
                                <option key={currentState.value} value={currentState.value} className='LeadText' aria-label={currentState.accessibleValue}>{currentState.value}</option>
                            )}
                        </select>
                    </label>
                    <label htmlFor="zip" className='ParagraphText'>
                        <span><span className='HighlightText' aria-hidden>*</span>ZIP code:</span>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            required
                            autoComplete='billing postal-code'
                            className='FormField LeadText'
                            value={reserveUserInfo.resZip}
                            onChange={e => reserveUserInfo.setResZip(e.target.value)}
                        />
                    </label>
                    <label htmlFor="ccNum" className='ParagraphText'>
                        <span><span className='HighlightText' aria-hidden>*</span>Credit card number:</span>
                        <input
                            type="tel"
                            id="ccNum"
                            name="ccNum"
                            required
                            maxLength="19"
                            minLength="19"
                            placeholder='#### #### #### ####'
                            pattern='^\d{4}\u{0020}\d{4}\u{0020}\d{4}\u{0020}\d{4}$'
                            autoComplete='cc-number'
                            className='FormField LeadText'
                            value={reserveUserInfo.resCCNum}
                            onChange={e => {
                                // reserveUserInfo.setResCCNum(e.target.value);
                                // If the input so far includes only digits (with spaces after evcery four) or is blank, then...
                                if (e.target.value.match(/^(?:(?:\d{1,3})|(?:\d{4}\u{0020}?)){1,3}(?:\d{1,4})?$/ug) || !e.target.value) {
                                    // If the number of digits > 4 && the number of digits % 4 === 1, and there isn't already a space before the digit that the user just typed, add one.
                                    let digits = e.target.value.length !== 0 ? e.target.value.match(/\d{1}/g).length : 0; // Finds the digits in the string.
                                    if (digits > 4 && digits % 4 === 1 && e.target.value.at(-2) !== " ") {
                                        let valAsArray = Array.from(e.target.value);
                                        valAsArray.splice(e.target.value.length - 1, 0, " ");
                                        e.target.value = valAsArray.toString().replaceAll(",", "");
                                    }
                                    // After that check, update the state.
                                    reserveUserInfo.setResCCNum(e.target.value);
                                }
                            }}
                        />
                    </label>
                    <label htmlFor="expDate" className='ParagraphText'>
                        <span><span className='HighlightText' aria-hidden>*</span>Expiration date:</span>
                        <input
                            type="tel"
                            id="expDate"
                            name="expDate"
                            required
                            maxLength="5"
                            minLength="5"
                            placeholder='MM/YY'
                            pattern='^(?:0[1-9]|1[0-2])\/\d{2}$'
                            autoComplete='cc-exp'
                            className='FormField LeadText'
                            value={reserveUserInfo.resExpDate}
                            onChange={e => {
                                // Input should be either a single digit (0 or 1) or 2 digits (0 followed by a nonzero digit,
                                // or 1 followed by 0, 1, or 2). If it's two digits, they might be followed by a /, which
                                // itself might be followed by 1 or 2 digits.
                                if (e.target.value.match(/^[0-1]$|^0[1-9]\/?(?:\d{1,2})?$|^1[0-2]\/?(?:\d{1,2})?$/g) || !e.target.value) {
                                    // If the number of digits > 2 && the number of digits % 2 === 1 && there isn't already a / before the digit that the user just typed, add one.
                                    let digits = e.target.value.length !== 0 ? e.target.value.match(/\d{1}/g).length : 0; // Finds the digits in the string.
                                    if (digits > 2 && digits % 2 === 1 && e.target.value.at(-2) !== "/") {
                                        let valAsArray = Array.from(e.target.value);
                                        valAsArray.splice(e.target.value.length - 1, 0, "/");
                                        e.target.value = valAsArray.toString().replaceAll(",", "");
                                    }
                                    // After that, update the state.
                                    reserveUserInfo.setResExpDate(e.target.value);
                                }
                            }}
                        />
                    </label>
                    <label htmlFor="threeDigitCode" className='ParagraphText'>
                        <span><span className='HighlightText' aria-hidden>*</span>3-digit code:</span>
                        <input
                            type="tel"
                            id="threeDigitCode"
                            name="threeDigitCode"
                            required
                            placeholder='###'
                            minLength="3"
                            maxLength="3"
                            pattern='^\d{3}$'
                            autoComplete='cc-csc'
                            className='FormField LeadText'
                            value={reserveUserInfo.res3Digit}
                            onChange={e => reserveUserInfo.setRes3Digit(e.target.value)}
                        />
                    </label>
                </fieldset>

                <button type="submit" className='MainButton LeadText' disabled={validateConfirmForm(reserveUserInfo)}>Confirm Reservation</button>
            </form>
        </main>
    </>);
}