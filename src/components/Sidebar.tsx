import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, Settings } from 'lucide-react';
import { FaUserTie } from 'react-icons/fa6'; // Icon for author
import './Sidebar.css';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Hamburger icon for mobile */}
      {isMobile && (
        <button className="mobile-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar container */}
      <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        {!isMobile && (
          <div className="sidebar-header">
            <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {isOpen && <span className="sidebar-title">MyApp</span>}
          </div>
        )}

        <nav className="links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <Home size={20} className="link-icon" />
            {isOpen && <span>Dashboard</span>}
          </Link>
          <Link to="/users" className={location.pathname === '/users' ? 'active' : ''}>
            <Users size={20} className="link-icon" />
            {isOpen && <span>Users</span>}
          </Link>
          <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
            <Settings size={20} className="link-icon" />
            {isOpen && <span>Settings</span>}
          </Link>
          <Link to="/author" className={location.pathname === '/author' ? 'active' : ''}>
            <FaUserTie size={20} className="link-icon" />
            {isOpen && <span>About Me</span>}
          </Link>
        </nav>
      </div>
    </>
  );
}
