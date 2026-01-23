import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <span className="logo-text">
        <span className="logo-x">X</span>
        <span className="logo-g">G</span>
        <span className="logo-l">L</span>
      </span>
      <span className="logo-decoration">🐉</span>
    </Link>
  )
}

export default Logo
