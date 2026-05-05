import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyComponent from './myFirstComponent.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <MyComponent/>
  </StrictMode>,
)
