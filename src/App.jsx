import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import './styles/app.css'

export default function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Home />
      <Footer />
    </div>
  )
}
