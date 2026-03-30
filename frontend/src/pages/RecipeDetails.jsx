// frontend/src/pages/RecipeDetails.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function RecipeDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const recipe = state.recipe;

  if (!recipe) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="recipe-details-container">
        <div className="recipe-details-left">
          <img 
            src={`http://127.0.0.1:8000${recipe.image}`} 
            alt={recipe.title} 
            className="recipe-details-image"
          />
        </div>
        <div className="recipe-details-right">
          <h1>{recipe.title}</h1>
          <h3>Ingredients:</h3>
          <p>{recipe.ingredients}</p>
          <button className="cook-now-button" onClick={() => navigate('/cooking', { state: { recipe } })}>
            Cook Now
          </button>
        </div>
      </div>
    </>
  );
}

export default RecipeDetails;