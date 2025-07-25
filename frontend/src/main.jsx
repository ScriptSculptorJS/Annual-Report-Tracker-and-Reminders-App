import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './hook/AuthContext.jsx';
import App from './App.jsx'
import './index.css';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <Router>
      <StrictMode>
        <App />
      </StrictMode>
    </Router>
  </AuthContextProvider>,
)