import './App.css';

import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import ReservationConfirmation from './Pages/ReservationConfirmation';
import NavBar from './Components/NavBar';

function App() {
    return (
      <>
        <NavBar/>
        <ReservationConfirmation/>
        <Footer/>
      </>
    );
}

export default App;
