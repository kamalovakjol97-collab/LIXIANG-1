import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <div className="logo-container">
        <div className="logo-svg-wrapper">
          <svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg" className="xgl-logo-svg">
            <defs>
              <linearGradient id="dragonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            
            {/* Текст XGL */}
            <text x="50" y="85" className="logo-text-x" fill="#dc2626">X</text>
            <text x="110" y="85" className="logo-text-g" fill="#000000">G</text>
            <text x="180" y="85" className="logo-text-l" fill="#059669">L</text>
            
            {/* Стилизованный дракон вокруг букв */}
            <path d="M20,60 Q40,20 100,40 T200,30 T280,70" 
                  fill="none" 
                  stroke="url(#dragonGrad)" 
                  strokeWidth="4" 
                  className="dragon-path">
              <animate attributeName="stroke-dasharray" from="0,500" to="500,0" dur="3s" fill="freeze" />
            </path>
            
            {/* Голова дракона */}
            <circle cx="280" cy="70" r="8" fill="#dc2626" className="dragon-head">
              <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
            </circle>
            
            <text x="110" y="110" className="logo-subtitle">新年快乐</text>
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default Logo
