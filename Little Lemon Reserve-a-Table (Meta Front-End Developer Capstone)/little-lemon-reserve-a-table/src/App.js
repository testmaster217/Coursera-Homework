import './App.css';
import NavBar from './Components/Nav';
import Hero from './Components/Hero';
import Specials from './Components/Specials';
import Testimonials from './Components/Testimonials';
import AboutUs from './Components/AboutUs';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <NavBar/>
      <Hero/>
      <main>
        <Specials/>
        <Testimonials/>
        <AboutUs/>
      </main>
      <Footer/>
    </>
  );
}

export default App;
