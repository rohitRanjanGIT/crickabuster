import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">        <Link to="/cart" className="text-xl font-bold flex items-center">
          <i className="fas fa-ticket-alt mr-2"></i> CrickBuster
        </Link>
        <nav>          <ul className="flex space-x-6">
            <li>
              <Link 
                to="/profile" 
                className={`hover:text-blue-200 flex items-center ${path === '/profile' ? 'text-blue-200 font-medium' : ''}`}
              >
                <i className="fas fa-user mr-1"></i> Profile
              </Link>
            </li>
            <li>
              <Link 
                to="/cart" 
                className={`hover:text-blue-200 flex items-center ${path === '/cart' ? 'text-blue-200 font-medium' : ''}`}
              >
                <i className="fas fa-shopping-cart mr-1"></i> Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
