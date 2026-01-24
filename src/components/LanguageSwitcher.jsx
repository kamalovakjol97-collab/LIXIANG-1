import { useLanguage } from '../context/LanguageContext'
import './LanguageSwitcher.css'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  const langs = [
    { code: 'ru', flag: '🇷🇺' },
    { code: 'zh', flag: '🇨🇳' }
  ]

  return (
    <div className="lang-switcher-modern">
      {langs.map((lang) => (
        <button
          key={lang.code}
          className={`lang-btn ${language === lang.code ? 'active' : ''}`}
          onClick={() => setLanguage(lang.code)}
          title={lang.code === 'ru' ? 'Русский' : '中文'}
        >
          <span className="lang-flag">{lang.flag}</span>
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
