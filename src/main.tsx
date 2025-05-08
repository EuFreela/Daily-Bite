import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CalorieProvider } from './context/CalorieContext.tsx'

createRoot(document.getElementById("root")!).render(
  <CalorieProvider>
    <App />
  </CalorieProvider>
);
