import { RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './routes.tsx'
import './styles.css'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('The #root HTML element is missing from the DOM')

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
