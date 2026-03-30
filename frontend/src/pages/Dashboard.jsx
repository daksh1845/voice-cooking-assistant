// frontend/src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';

function Dashboard() {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    axios.get('http://localhost:8000/api/recipes/')
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
    
    axios.get('http://localhost:8000/api/history/list/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setHistory(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="sidebar">
          <h3>Cooking History</h3>
          {history.length === 0 ? <p>No recipes cooked yet</p> : 
            history.map(item => (
              <p key={item.id}>{item.recipe_title}</p>
            ))
          }
        </div>
        <div className="main-content">
          <input 
            type="text" 
            placeholder="Search recipes..." 
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="recipe-grid">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;