// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import RecipeDetails from './pages/RecipeDetails';
import CookingMode from './pages/CookingMode';
import CookingComplete from './pages/CookingComplete';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/recipe" element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>} />
        <Route path="/cooking" element={<ProtectedRoute><CookingMode /></ProtectedRoute>} />
        <Route path="/complete" element={<ProtectedRoute><CookingComplete /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;