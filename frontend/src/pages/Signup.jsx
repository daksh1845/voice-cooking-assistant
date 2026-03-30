// Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Signup() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await axios.post('http://localhost:8000/api/signup/', form);
      alert('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <h2>Create Account</h2>
        <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} />
        <br />
        <input placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />
        <br />
        <button onClick={signup}>Sign Up</button>
        <p>Already have an account? <button onClick={() => navigate('/login')}>Login</button></p>
      </div>
    </>
  );
}
export default Signup;