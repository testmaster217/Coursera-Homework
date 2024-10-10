import './App.css';

import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import ReserveATAble from './Pages/ReserveATable';
import ConfirmReservation from './Pages/ConfirmReservation';
import ReservationConfirmation from './Pages/ReservationConfirmation';
import NavBar from './Components/NavBar';

import { Routes, Route } from 'react-router-dom';

function App() {
    return (
      <>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/reserve-a-table' element={<ReserveATAble/>}/>
          <Route path='/reserve-page-2' element={<ConfirmReservation/>}/>
          <Route path='/reserve-confirmation' element={<ReservationConfirmation/>}/>
        </Routes>
        <Footer/>
      </>
    );
}

export default App;
