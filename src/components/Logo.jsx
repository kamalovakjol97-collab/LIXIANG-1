import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <div className="logo-container">
        <div className="logo-text-wrapper">
          <span className="logo-text">
            <span className="logo-x">X</span>
            <span className="logo-g">G</span>
            <span className="logo-l">L</span>
          </span>
          <svg 
            className="logo-dragon-svg" 
            viewBox="0 0 240 100" 
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="dragonBodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="30%" stopColor="#3b82f6" />
                <stop offset="70%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="dragonScaleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
              <filter id="dragonGlow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Хвост, обвивающий L (начинается слева от L) */}
            <path
              className="dragon-tail"
              d="M 15 60 Q 8 55, 12 50 Q 18 45, 20 52 Q 22 58, 25 60"
              fill="url(#dragonBodyGradient)"
              stroke="url(#dragonScaleGradient)"
              strokeWidth="2.5"
              filter="url(#dragonGlow)"
            />
            
            {/* Тело дракона, проходящее через X, G и к голове */}
            <path
              className="dragon-body"
              d="M 25 60 Q 35 58, 45 60 Q 55 58, 65 60 Q 75 58, 85 60 Q 95 58, 105 60 Q 115 58, 125 60 Q 135 62, 145 60 Q 155 58, 165 60 Q 175 58, 185 55 Q 195 52, 205 50"
              fill="none"
              stroke="url(#dragonBodyGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#dragonGlow)"
            />
            
            {/* Чешуя на теле (мерцающая) */}
            <g className="dragon-scales">
              <ellipse cx="50" cy="60" rx="4" ry="3" fill="url(#dragonScaleGradient)" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="8s" repeatCount="indefinite" />
                <animate attributeName="fill" values="url(#dragonScaleGradient);#fbbf24;url(#dragonScaleGradient)" dur="9s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="80" cy="60" rx="4" ry="3" fill="url(#dragonScaleGradient)" opacity="0.75">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="9s" repeatCount="indefinite" begin="1.2s" />
                <animate attributeName="fill" values="url(#dragonScaleGradient);#dc2626;url(#dragonScaleGradient)" dur="8.5s" repeatCount="indefinite" begin="1.2s" />
              </ellipse>
              <ellipse cx="110" cy="60" rx="4" ry="3" fill="url(#dragonScaleGradient)" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="8.5s" repeatCount="indefinite" begin="2.5s" />
                <animate attributeName="fill" values="url(#dragonScaleGradient);#fbbf24;url(#dragonScaleGradient)" dur="9.5s" repeatCount="indefinite" begin="2.5s" />
              </ellipse>
              <ellipse cx="140" cy="60" rx="4" ry="3" fill="url(#dragonScaleGradient)" opacity="0.7">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="9.5s" repeatCount="indefinite" begin="4s" />
                <animate attributeName="fill" values="url(#dragonScaleGradient);#dc2626;url(#dragonScaleGradient)" dur="8s" repeatCount="indefinite" begin="4s" />
              </ellipse>
              <ellipse cx="170" cy="58" rx="4" ry="3" fill="url(#dragonScaleGradient)" opacity="0.75">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="8.8s" repeatCount="indefinite" begin="5.5s" />
                <animate attributeName="fill" values="url(#dragonScaleGradient);#fbbf24;url(#dragonScaleGradient)" dur="9.2s" repeatCount="indefinite" begin="5.5s" />
              </ellipse>
            </g>
            
            {/* Голова дракона (справа, приподнята и развёрнута к зрителю) */}
            <g className="dragon-head">
              {/* Основная форма головы */}
              <ellipse
                className="dragon-head-body"
                cx="210"
                cy="48"
                rx="14"
                ry="10"
                fill="url(#dragonBodyGradient)"
                transform="rotate(-10 210 48)"
                filter="url(#dragonGlow)"
              />
              
              {/* Морда */}
              <ellipse
                cx="220"
                cy="50"
                rx="6"
                ry="5"
                fill="url(#dragonBodyGradient)"
                opacity="0.9"
              />
              
              {/* Глаза (моргающие) */}
              <circle className="dragon-eye-left" cx="205" cy="46" r="2.5" fill="#fbbf24">
                <animate attributeName="opacity" values="1;0.2;1" dur="4s" repeatCount="indefinite" begin="0s" />
                <animate attributeName="r" values="2.5;2;2.5" dur="0.3s" repeatCount="indefinite" begin="0s" />
              </circle>
              <circle className="dragon-eye-right" cx="212" cy="45" r="2.5" fill="#fbbf24">
                <animate attributeName="opacity" values="1;0.2;1" dur="4s" repeatCount="indefinite" begin="2s" />
                <animate attributeName="r" values="2.5;2;2.5" dur="0.3s" repeatCount="indefinite" begin="2s" />
              </circle>
              
              {/* Рога/грива (золотые и красные) */}
              <path
                className="dragon-mane"
                d="M 215 40 Q 218 36, 222 40 Q 224 42, 222 44"
                fill="url(#dragonScaleGradient)"
                stroke="#dc2626"
                strokeWidth="2"
                opacity="0.9"
              />
              <path
                className="dragon-mane-2"
                d="M 208 38 Q 210 34, 213 38 Q 215 40, 213 42"
                fill="#fbbf24"
                stroke="#dc2626"
                strokeWidth="1.5"
                opacity="0.8"
              />
              
              {/* Ноздри */}
              <ellipse cx="218" cy="52" rx="1.2" ry="0.6" fill="#dc2626" />
              <ellipse cx="221" cy="52" rx="1.2" ry="0.6" fill="#dc2626" />
              
              {/* Усы/бакенбарды (минималистичные) */}
              <line x1="225" y1="48" x2="228" y2="47" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="225" y1="52" x2="228" y2="53" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            
            {/* Лапы (минималистичные, движущиеся) */}
            <circle className="dragon-paw-1" cx="70" cy="65" r="3" fill="url(#dragonBodyGradient)" opacity="0.8" />
            <circle className="dragon-paw-2" cx="130" cy="66" r="3" fill="url(#dragonBodyGradient)" opacity="0.8" />
            <circle className="dragon-paw-3" cx="160" cy="64" r="2.5" fill="url(#dragonBodyGradient)" opacity="0.7" />
          </svg>
        </div>
        <div className="logo-new-year">新年快乐</div>
      </div>
    </Link>
  )
}

export default Logo
