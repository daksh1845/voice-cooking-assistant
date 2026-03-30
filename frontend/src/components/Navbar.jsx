import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="navbar">
      <h1>Cooking Assistant</h1>
      
      {token ? (
        <div 
          className="profile-container"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onClick={() => setOpen(!open)}
        >
          <span>👤</span>
          <div className={`profile-menu ${open ? 'show' : ''}`}>
            <div className="profile-username">{username}</div>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      ) : (
        <button onClick={() => navigate('/login')}>Login</button>
      )}
    </div>
  );
}

export default Navbar;