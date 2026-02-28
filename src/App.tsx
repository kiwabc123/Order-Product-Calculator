import './App.css'
import OrderCalculator from './components/OrderCalculator'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🛒 Order Calculator</h1>
        <p>Calculate your order with real-time discounts</p>
      </header>
      <main className="app-main">
        <OrderCalculator />
      </main>
    </div>
  )
}

export default App
