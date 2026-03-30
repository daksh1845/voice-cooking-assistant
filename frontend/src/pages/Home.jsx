// frontend/src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import micImage from '../images/mike.png';

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleStartCooking = () => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1 className="home-title">Voice Controlled Cooking Assistant</h1>
        <p className="home-description">Cook hands-free with voice commands guiding you step by step</p>
        <img src={micImage} alt="Microphone" className="home-image" />
        <button className="start-button" onClick={handleStartCooking}>Start Cooking</button>
      </div>
    </>
  );
}

export default Home;