import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'
import './utils/errorMonitoring'

// Add development-only crash reporting
if (import.meta.env.DEV) {
  console.log('🔍 Error monitoring enabled for development')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
