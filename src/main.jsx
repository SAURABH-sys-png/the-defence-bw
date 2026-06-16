// src/main.jsx
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Header } from './layouts/header'
import BlogBody from './homeBlog'
import DefenseCalculator from './calculator' // Import your calculator component
import './styles/index.css'

function App() {
  // Track which page/view is currently active
  const [currentView, setCurrentView] = useState('home');

  // Dynamic rendering logic based on currentView state
  const renderBody = () => {
    switch (currentView) {
      case 'home':
        return <BlogBody />;
      case 'calculator':
        return <DefenseCalculator />;
      // You can add more views here seamlessly later:
      // case 'about': return <About />
      default:
        return <BlogBody />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Pass currentView and setCurrentView down to the Header */}
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      {/* Container where the dynamic body changes */}
      <main className="container mx-auto px-4 py-6">
        {renderBody()}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)