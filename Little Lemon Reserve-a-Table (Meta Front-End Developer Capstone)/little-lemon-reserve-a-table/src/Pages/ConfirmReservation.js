import chef from "../Assets/restaurant chef B.jpg";

import ReservationHero from '../Components/ReservationHero'

export default function ConfirmReservation() {
    return (<>
        <ReservationHero headerText="Confirm your Reservation" photo={chef}/>
        <main>
            <form>
                {/* TODO: Figure out how to get the ZIP code, the CC
                number, the expiration date (if it's text-type
                fallback doesn't have the validation needed already),
                and the 3-digit code to have validation. (This might
                come up later in the project anyway.) */}
                <fieldset>
                    <legend>Contact Info</legend>

                    <label htmlFor="fName">First name:</label>
                    <input type="text" id="fName" name="fName" required/>

                    <label htmlFor="lName">Last name:</label>
                    <input type="text" id="lName" name="lName" required/>

                    <label htmlFor="phone">Phone #:</label>
                    <input type="tel" id="phone" name="phone"/>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required/>
                </fieldset>

                <fieldset>
                    <legend>Billing Info</legend>

                    <label htmlFor="ccName">Name on credit card:</label>
                    <input type="text" id="ccName" name="ccName" required/>

                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" required/>

                    <label htmlFor="addressLine2">Address line 2:</label>
                    <input type="text" id="addressLine2" name="addressLine2"/>

                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="city" required/>

                    <label htmlFor="state">State:</label>
                    <select id="state" name="state" required>
                        <option value="AL">AL</option>
                        <option value="AK">AK</option>
                        <option value="AZ">AZ</option>
                        <option value="AR">AR</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DE">DE</option>
                        <option value="DC">DC</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="ME">ME</option>
                        <option value="MD">MD</option>
                        <option value="MA">MA</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MS">MS</option>
                        <option value="MO">MO</option>
                        <option value="MT">MT</option>
                        <option value="NE">NE</option>
                        <option value="NV">NV</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NY">NY</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VT">VT</option>
                        <option value="VA">VA</option>
                        <option value="WA">WA</option>
                        <option value="WV">WV</option>
                        <option value="WI">WI</option>
                        <option value="WY">WY</option>
                    </select>

                    <label htmlFor="zip">ZIP code:</label>
                    <input type="text" id="zip" name="zip" required/>

                    <label htmlFor="ccNum">Credit card number:</label>
                    <input type="text" id="ccNum" name="ccNum" required/>

                    <label htmlFor="expDate">Expiration date:</label>
                    <input type="month" id="expDate" name="expDate" required/>

                    <label htmlFor="threeDigitCode">3-digit code:</label>
                    <input type="text" id="threeDigitCode" name="threeDigitCode" required/>
                </fieldset>

                <input type="submit">Confirm Reservation</input>
            </form>
        </main>
    </>);
}