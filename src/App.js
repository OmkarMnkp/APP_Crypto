
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Coin from './pages/coin/Coin';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/coin/:coinId' element={<Coin/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
