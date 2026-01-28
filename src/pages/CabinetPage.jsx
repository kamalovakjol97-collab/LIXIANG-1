import { useLanguage } from '../context/LanguageContext'
import './CabinetPage.css'

const CabinetPage = () => {
  const { language } = useLanguage()

  return (
    <div className="cabinet-page">
      <div className="cabinet-hero">
        <div className="container">
          <h1 className="cabinet-title">
            {language === 'ru' ? 'Личный кабинет XGL' : 'XGL 个人账户'}
          </h1>
          <p className="cabinet-subtitle">
            {language === 'ru' 
              ? 'Управление заявками и отслеживание грузов'
              : '管理申请和跟踪货物'}
          </p>
        </div>
      </div>
      
      <div className="cabinet-content">
        <div className="container">
          <div className="cabinet-placeholder">
            <h2>
              {language === 'ru' 
                ? 'Личный кабинет находится в разработке'
                : '个人账户正在开发中'}
            </h2>
            <p>
              {language === 'ru' 
                ? 'Скоро здесь будет доступен полный функционал для управления вашими заявками и отслеживания грузов.'
                : '很快这里将提供完整的功能来管理您的申请和跟踪货物。'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CabinetPage
