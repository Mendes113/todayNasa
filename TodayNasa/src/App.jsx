// CSS
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// pages 
import Home from './pages/Home/Home';
// import Space from './pages/Space/Space';
import Navbar from './components/Navbar/Navbar';
import Mars from './pages/Mars/Mars';
import FooterConditional from './components/FooterConditional';
import About from './pages/About/About';
function App() {
  
  return (
    <div className="App">
      <Router>
      <Navbar />
        <div className="container"> 
          <Routes>
            <Route path="/todayNasa" element={<Home />} />
            <Route path="/mars" element={<Mars />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <FooterConditional />
      </Router>
    </div>
  );
}

export default App
