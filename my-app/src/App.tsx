import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignInPage } from './pages/SignInPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />}/>
        <Route path="/" element={<SignInPage />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;