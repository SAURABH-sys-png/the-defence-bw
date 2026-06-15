// src/main.jsx (or src/index.jsx)
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Header } from './layouts/header'
import './index.css' // <-- Crucial so Tailwind styles load!

// Finding the 'root' div from index.html and rendering the App inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header></Header>
  </React.StrictMode>,
)