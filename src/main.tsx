import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import MensaplanProvider from './providers/MensaplanProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MensaplanProvider>
      <App />
    </MensaplanProvider>
  </React.StrictMode>,
)
