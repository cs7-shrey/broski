import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </StrictMode>,
)
