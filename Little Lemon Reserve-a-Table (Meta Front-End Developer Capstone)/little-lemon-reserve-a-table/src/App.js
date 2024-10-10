import './App.css';

import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import ReserveATAble from './Pages/ReserveATable';
import ConfirmReservation from './Pages/ConfirmReservation';
import ReservationConfirmation from './Pages/ReservationConfirmation';
import NavBar from './Components/NavBar';

function App() {
    return (
      <>
        <NavBar/>
        <ConfirmReservation/>
        <Footer/>
      </>
    );
}

export default App;
