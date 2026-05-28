import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LondonHamPortfolio from './london_ham_new.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LondonHamPortfolio />
  </StrictMode>,
)
