// Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const login = async () => {
    const res = await axios.post('http://localhost:8000/api/login/', form);
    localStorage.setItem('token', res.data.access);
    localStorage.setItem('username', res.data.username);
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2>Login</h2>
        <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} />
        <br />
        <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />
        <br />
        <button onClick={login}>Login</button>
        <p>Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button></p>
      </div>
    </>
  );
}
export default Login;