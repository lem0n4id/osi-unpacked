import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UIStateProvider } from './lib/state.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UIStateProvider>
      <App />
    </UIStateProvider>
  </StrictMode>,
)
