import { useLanguage } from '../context/LanguageContext'
import './LanguageSwitcher.css'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  const langs = [
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'ky', label: 'KG', flag: '🇰🇬' }
  ]

  return (
    <div className="lang-switcher-modern">
      {langs.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${language === lang.code ? 'active' : ''}`}
          onClick={() => setLanguage(lang.code)}
        >
          <span className="lang-flag">{lang.flag}</span>
          <span className="lang-code">{lang.label}</span>
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
