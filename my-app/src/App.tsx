import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage';
import { SavedRecipesPage } from './pages/SavedRecipesPage';
import { ShoppingCartPage } from './pages/ShoppingCartPage';
import { ContactUsPage } from './pages/ContactUs';
import { SearchPage } from './pages/SearchPage';
import { AboutTeamPage } from './pages/AboutTeam';
import { ErrorPage } from './pages/ErrorPage';
import { RecipesPage } from './pages/RecipesPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />}/>
        <Route path="/saved-recipes" element={<SavedRecipesPage />}/>
        <Route path="/shopping-cart" element={<ShoppingCartPage />}/>
        <Route path="/contact-us" element={<ContactUsPage />}/>
        <Route path="/search-recipes" element={<SearchPage />}/>
        <Route path="/about-team" element={<AboutTeamPage />}/>
        <Route path="/recipes/{id}" element={<RecipesPage />}/>
        <Route path="/*" element={<ErrorPage />}/>

      </Routes>
    </Router>
    </>
  );
}

export default App;