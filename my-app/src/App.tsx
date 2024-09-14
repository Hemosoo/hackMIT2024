import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage';
import { SavedRecipesPage } from './pages/SavedRecipesPage';
import { ShoppingCartPage } from './pages/ShoppingCartPage';
import { ContactUsPage } from './pages/ContactUs';
import { SearchPage } from './pages/SearchPage';

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
        <Route path="/shopping-cart" element={<ShoppingCartPage />}/>
        <Route path="/shopping-cart" element={<ShoppingCartPage />}/>

      </Routes>
    </Router>
    </>
  );
}

export default App;