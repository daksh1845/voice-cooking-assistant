// frontend/src/pages/CookingComplete.jsx
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function CookingComplete() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const recipe = state.recipe;
  const savedRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!savedRef.current) {
      savedRef.current = true;
      axios.get(`${process.env.REACT_APP_API_URL}/api/history/list/`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        const exists = res.data.some(item => item.recipe_title === recipe.title);
        if (!exists) {
          axios.post(`${process.env.REACT_APP_API_URL}/api/history/`, { recipe_id: recipe.id }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      }).catch(err => console.log(err));
    }
    
    const timer = setTimeout(() => navigate('/'), 5000);
    return () => clearTimeout(timer);
  }, [navigate, recipe.id, recipe.title]);

  return (
    <div className="complete-container">
      <div className="complete-tick">✓</div>
      <h1 className="complete-title">Cooking Completed!</h1>
      <p className="complete-message">Redirecting to home...</p>
    </div>
  );
}

export default CookingComplete;