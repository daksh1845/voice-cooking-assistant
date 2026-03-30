import { useNavigate } from 'react-router-dom';

function RecipeCard({recipe}) {
  const navigate = useNavigate();

  return (
    <div className="recipe-card" onClick={() => navigate('/recipe', { state: { recipe } })}>
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="recipe-image"
      />
      <h3 className="recipe-title">{recipe.title}</h3>
    </div>
  );
}

export default RecipeCard;