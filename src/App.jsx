import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './assets/cart.css';
import Header from './components/Header';
import AddToCart from './pages/AddToCart';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Header />
      <div className="mt-4">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/" element={<AddToCart />} /> {/* Default route set to AddToCart */}
        </Routes>
      </div>
    </Router>
  );
}

export default App
