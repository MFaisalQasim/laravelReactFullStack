import React from 'react'
import ReactDOM from 'react-dom/client'
// bootstrap
import './bootstrap/index.css'
// tailwind
// import './index.css'
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './contexts/ContextProvider';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>,
)
