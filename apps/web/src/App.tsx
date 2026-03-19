import { useState } from 'react'
import './App.css'
import OrderCalculator from './components/OrderCalculator'
import AnalyticsPage from './components/AnalyticsPage'

function App() {
  const [currentPage, setCurrentPage] = useState<'calculator' | 'analytics'>('calculator')

  return (
    <div className="app">
      <nav className="app-nav">
        <div className="nav-container">
          <h1 className="nav-title">🛒 Order System</h1>
          <ul className="nav-menu">
            <li>
              <button
                className={`nav-link ${currentPage === 'calculator' ? 'active' : ''}`}
                onClick={() => setCurrentPage('calculator')}
              >
                💳 Calculator
              </button>
            </li>
            <li>
              <button
                className={`nav-link ${currentPage === 'analytics' ? 'active' : ''}`}
                onClick={() => setCurrentPage('analytics')}
              >
                📊 Analytics
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="app-main">
        {currentPage === 'calculator' ? (
          <>
            <header className="app-header">
              <h1>🛒 Order Calculator</h1>
              <p>Calculate your order with real-time discounts</p>
            </header>
            <OrderCalculator />
          </>
        ) : (
          <AnalyticsPage />
        )}
      </main>
    </div>
  )
}

export default App
