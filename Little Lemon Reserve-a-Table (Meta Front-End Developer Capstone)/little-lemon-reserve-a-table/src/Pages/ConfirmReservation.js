import './ConfirmReservation.css';

import chef from "../Assets/restaurant chef B.jpg";

import ReservationHero from '../Components/ReservationHero'

import { useEffect } from 'react';

const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY"
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
    !states.includes(reserveUserInfo.resState) ||
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
                    <div>
                        <label htmlFor="fName" className='ParagraphText'><span className='HighlightText'>*</span>First name:</label>
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
                    </div>
                    <div>
                        <label htmlFor="lName" className='ParagraphText'><span className='HighlightText'>*</span>Last name:</label>
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
                    </div>
                    <div>
                        <label htmlFor="phone" className='ParagraphText'>Phone #:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            autoComplete='tel'
                            className='FormField LeadText'
                            value={reserveUserInfo.resPhone}
                            onChange={e => reserveUserInfo.setResPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className='ParagraphText'><span className='HighlightText'>*</span>Email:</label>
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
                    </div>
                </fieldset>

                <fieldset>
                    <legend className='DisplayTitle'>Billing Info</legend>
                    <div>
                        <label htmlFor="ccName" className='ParagraphText'><span className='HighlightText'>*</span>Name on credit card:</label>
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
                    </div>
                    <div>
                        <label htmlFor="address" className='ParagraphText'><span className='HighlightText'>*</span>Address:</label>
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
                    </div>
                    <div>
                        <label htmlFor="addressLine2" className='ParagraphText'>Address line 2:</label>
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
                    </div>
                    <div>
                        <label htmlFor="city" className='ParagraphText'><span className='HighlightText'>*</span>City:</label>
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
                    </div>
                    <div>
                        <label htmlFor="state" className='ParagraphText'>State:</label>
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
                                <option key={currentState} value={currentState} className='LeadText'>{currentState}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="zip" className='ParagraphText'><span className='HighlightText'>*</span>ZIP code:</label>
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
                    </div>
                    <div>
                        <label htmlFor="ccNum" className='ParagraphText'><span className='HighlightText'>*</span>Credit card number:</label>
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
                    </div>
                    <div>
                        <label htmlFor="expDate" className='ParagraphText'><span className='HighlightText'>*</span>Expiration date:</label>
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
                    </div>
                    <div>
                        <label htmlFor="threeDigitCode" className='ParagraphText'><span className='HighlightText'>*</span>3-digit code:</label>
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
                    </div>
                </fieldset>

                <button type="submit" className='MainButton LeadText' disabled={validateConfirmForm(reserveUserInfo)}>Confirm Reservation</button>
            </form>
        </main>
    </>);
}