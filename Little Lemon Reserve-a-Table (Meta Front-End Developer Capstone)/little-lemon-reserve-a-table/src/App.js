import './App.css';

import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import ReserveATAble from './Pages/ReserveATable';
import ConfirmReservation from './Pages/ConfirmReservation';
import ReservationConfirmation from './Pages/ReservationConfirmation';
import NavBar from './Components/NavBar';

import { useReducer, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
    /* TODO: Change this to show different times depending on the selected date.
    (Will come up later in the course.) */
    function updateTimes(selectedDate) {
        return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    }

    // function initializeTimes() {
    //     return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    // }

    /* TODO: Add default states for all of these based on the formats that they need to be in. */
    const [resDate, setResDate] = useState("");
    const [availableTimes, setAvailableTimes] = useReducer(updateTimes, ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
    const [resTime, setResTime] = useState(availableTimes[0]);
    const [resGuests, setResGuests] = useState(1);
    const [resSeating, setResSeating] = useState("No Preference");
    const [resOccasion, setResOccasion] = useState("nothing");
    const [resComments, setResComments] = useState("");
    const [resFirstName, setResFirstName] = useState("");
    const [resLastName, setResLastName] = useState("");
    const [resPhone, setResPhone] = useState("");
    const [resEmail, setResEmail] = useState("");
    const [resCCName, setResCCName] = useState("");
    const [resAddress, setResAddress] = useState("");
    const [resAddress2, setResAddress2] = useState("");
    const [resCity, setResCity] = useState("");
    const [resState, setResState] = useState("AL");
    const [resZip, setResZip] = useState("");
    const [resCCNum, setResCCNum] = useState("");
    const [resExpDate, setResExpDate] = useState("");
    const [res3Digit, setRes3Digit] = useState("");

    const reserveInfo = {
        resDate: resDate,
        setResDate: setResDate,
        availableTimes: availableTimes,
        setAvailableTimes: setAvailableTimes,
        resTime: resTime,
        setResTime: setResTime,
        resGuests: resGuests,
        setResGuests: setResGuests,
        resSeating: resSeating,
        setResSeating: setResSeating,
        resOccasion: resOccasion,
        setResOccasion: setResOccasion,
        resComments: resComments,
        setResComments: setResComments
    };
    const reserveUserInfo = {
        resFirstName: resFirstName,
        setResFirstName: setResFirstName,
        resLastName: resLastName,
        setResLastName: setResLastName,
        resPhone: resPhone,
        setResPhone: setResPhone,
        resEmail: resEmail,
        setResEmail: setResEmail,
        resCCName: resCCName,
        setResCCName: setResCCName,
        resAddress: resAddress,
        setResAddress: setResAddress,
        resAddress2: resAddress2,
        setResAddress2: setResAddress2,
        resCity: resCity,
        setResCity: setResCity,
        resState: resState,
        setResState: setResState,
        resZip: resZip,
        setResZip: setResZip,
        resCCNum: resCCNum,
        setResCCNum: setResCCNum,
        resExpDate: resExpDate,
        setResExpDate: setResExpDate,
        res3Digit: res3Digit,
        setRes3Digit: setRes3Digit
    }

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path='/' element={<Homepage/>}/>
                {/* TODO: Add a route to make the "About Us" link in the nav bar scroll to
                the "About Us" section of the homepage. Will involve useEffect and possibly
                useRef */}
                <Route path='/reserve-a-table' element={<ReserveATAble reserveInfo={reserveInfo}/>}/>
                <Route path='/reserve-page-2' element={<ConfirmReservation reserveUserInfo={reserveUserInfo}/>}/>
                <Route path='/reserve-confirmation' element={<ReservationConfirmation/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
