import { useLanguage } from '../context/LanguageContext'
import './LanguageSwitcher.css'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === 'ru' ? 'active' : ''}`}
        onClick={() => setLanguage('ru')}
      >
        RU
      </button>
      <button
        className={`lang-btn ${language === 'zh' ? 'active' : ''}`}
        onClick={() => setLanguage('zh')}
      >
        中文
      </button>
    </div>
  )
}

export default LanguageSwitcher
