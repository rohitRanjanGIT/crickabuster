import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './assets/cart.css';
import AddToCart from './pages/AddToCart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cart" element={<AddToCart />} />
        <Route path="/" element={<AddToCart />} /> {/* Default route for testing */}
      </Routes>
    </Router>
  );
}

export default App
