import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { AuthProviderWrapper } from './contexts/auth.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProviderWrapper>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </AuthProviderWrapper>
)
