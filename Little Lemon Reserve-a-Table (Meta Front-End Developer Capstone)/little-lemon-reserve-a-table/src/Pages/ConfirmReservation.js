import './ConfirmReservation.css';

import chef from "../Assets/restaurant chef B.jpg";

import ReservationHero from '../Components/ReservationHero'

import { useEffect } from 'react';

export default function ConfirmReservation({reserveUserInfo, handleSubmit}) {
    useEffect(() => {
        const currentDate = new Date();
        reserveUserInfo.setResExpDate(`${(currentDate.getFullYear() + 3).toPrecision(4)}-${(currentDate.getMonth() + 1).toPrecision(2)}`);
    }, []);

    return (<>
        <ReservationHero headerText="Confirm your Reservation" photo={chef} backLink="/reserve-a-table"/>
        <main>
            <form className="ReserveConfirmForm" role='form' onSubmit={handleSubmit}>
                {/* TODO: Figure out how to get the ZIP code, the CC
                number, the expiration date (if it's text-type
                fallback doesn't have the validation needed already),
                and the 3-digit code to have validation. (This might
                come up later in the project anyway.) */}
                {/* TODO: Add error messages that appear when a field is invalid.
                (Might come up later in the project.) */}
                <fieldset>
                    <legend className="DisplayTitle">Contact Info</legend>
                    <div>
                        <label htmlFor="fName" className='ParagraphText'><span className='HighlightText'>*</span>First name:</label>
                        <input
                            type="text"
                            id="fName"
                            name="fName"
                            required
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
                            required
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
                            className='FormDropDown LeadText'
                            value={reserveUserInfo.resState}
                            onChange={e => reserveUserInfo.setResState(e.target.value)}
                        >
                            <option value="AL" className='LeadText'>AL</option>
                            <option value="AK" className='LeadText'>AK</option>
                            <option value="AZ" className='LeadText'>AZ</option>
                            <option value="AR" className='LeadText'>AR</option>
                            <option value="CA" className='LeadText'>CA</option>
                            <option value="CO" className='LeadText'>CO</option>
                            <option value="CT" className='LeadText'>CT</option>
                            <option value="DE" className='LeadText'>DE</option>
                            <option value="DC" className='LeadText'>DC</option>
                            <option value="FL" className='LeadText'>FL</option>
                            <option value="GA" className='LeadText'>GA</option>
                            <option value="HI" className='LeadText'>HI</option>
                            <option value="ID" className='LeadText'>ID</option>
                            <option value="IL" className='LeadText'>IL</option>
                            <option value="IN" className='LeadText'>IN</option>
                            <option value="KS" className='LeadText'>KS</option>
                            <option value="KY" className='LeadText'>KY</option>
                            <option value="LA" className='LeadText'>LA</option>
                            <option value="ME" className='LeadText'>ME</option>
                            <option value="MD" className='LeadText'>MD</option>
                            <option value="MA" className='LeadText'>MA</option>
                            <option value="MI" className='LeadText'>MI</option>
                            <option value="MN" className='LeadText'>MN</option>
                            <option value="MS" className='LeadText'>MS</option>
                            <option value="MO" className='LeadText'>MO</option>
                            <option value="MT" className='LeadText'>MT</option>
                            <option value="NE" className='LeadText'>NE</option>
                            <option value="NV" className='LeadText'>NV</option>
                            <option value="NH" className='LeadText'>NH</option>
                            <option value="NJ" className='LeadText'>NJ</option>
                            <option value="NM" className='LeadText'>NM</option>
                            <option value="NY" className='LeadText'>NY</option>
                            <option value="NC" className='LeadText'>NC</option>
                            <option value="ND" className='LeadText'>ND</option>
                            <option value="OH" className='LeadText'>OH</option>
                            <option value="OK" className='LeadText'>OK</option>
                            <option value="OR" className='LeadText'>OR</option>
                            <option value="PA" className='LeadText'>PA</option>
                            <option value="RI" className='LeadText'>RI</option>
                            <option value="SC" className='LeadText'>SC</option>
                            <option value="SD" className='LeadText'>SD</option>
                            <option value="TN" className='LeadText'>TN</option>
                            <option value="TX" className='LeadText'>TX</option>
                            <option value="UT" className='LeadText'>UT</option>
                            <option value="VT" className='LeadText'>VT</option>
                            <option value="VA" className='LeadText'>VA</option>
                            <option value="WA" className='LeadText'>WA</option>
                            <option value="WV" className='LeadText'>WV</option>
                            <option value="WI" className='LeadText'>WI</option>
                            <option value="WY" className='LeadText'>WY</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="zip" className='ParagraphText'><span className='HighlightText'>*</span>ZIP code:</label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            required
                            className='FormField LeadText'
                            value={reserveUserInfo.resZip}
                            onChange={e => reserveUserInfo.setResZip(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="ccNum" className='ParagraphText'><span className='HighlightText'>*</span>Credit card number:</label>
                        <input
                            type="text"
                            id="ccNum"
                            name="ccNum"
                            required
                            className='FormField LeadText'
                            value={reserveUserInfo.resCCNum}
                            onChange={e => reserveUserInfo.setResCCNum(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="expDate" className='ParagraphText'><span className='HighlightText'>*</span>Expiration date:</label>
                        <input
                            type="month"
                            id="expDate"
                            name="expDate"
                            required
                            className='FormField LeadText'
                            value={reserveUserInfo.resExpDate}
                            onChange={e => reserveUserInfo.setResExpDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="threeDigitCode" className='ParagraphText'><span className='HighlightText'>*</span>3-digit code:</label>
                        <input
                            type="text"
                            id="threeDigitCode"
                            name="threeDigitCode"
                            required
                            className='FormField LeadText'
                            value={reserveUserInfo.res3Digit}
                            onChange={e => reserveUserInfo.setRes3Digit(e.target.value)}
                        />
                    </div>
                </fieldset>

                <button type="submit" className='MainButton LeadText'>Confirm Reservation</button>
            </form>
        </main>
    </>);
}