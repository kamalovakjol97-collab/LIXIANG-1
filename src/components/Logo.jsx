import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <div className="logo-container">
        <span className="logo-text">
          <span className="logo-x">X</span>
          <span className="logo-dragon">🐉</span>
          <span className="logo-g">G</span>
          <span className="logo-dragon">🐉</span>
          <span className="logo-l">L</span>
        </span>
        <div className="logo-new-year">新年快乐</div>
      </div>
    </Link>
  )
}

export default Logo
