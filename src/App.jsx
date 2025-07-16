import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './assets/cart.css';
import './assets/payment-status.css';
import Header from './components/Header';
import AddToCart from './pages/AddToCart';
import Profile from './pages/Profile';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import News from './pages/News';
import NewsPreview from './pages/NewsPreview';
import AcceptUserMailTemplate from './mail/AcceptUserMainTemplate';
import RejectUserMailTemplate from './mail/RejectUserMailTemplate';
import AdminMailTemplate from './mail/AdminMailTemplate';

function App() {
  return (
    <Router>
      <Header />
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<News />} /> {/* Default route set to News */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/paymentfailed" element={<PaymentFailed />} />
          <Route path="/adminMail" element={<AdminMailTemplate />} />
          <Route path="/acceptusermail" element={<AcceptUserMailTemplate />} />
          <Route path="/rejectusermail" element={<RejectUserMailTemplate />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsPreview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
