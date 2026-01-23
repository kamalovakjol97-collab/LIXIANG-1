import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru')

  const translations = {
    ru: {
      // Header
      'calculate': 'Рассчитать доставку',
      'workingHours': 'График работы: пн.-пт. с 10.00 до 19.00',
      // Hero
      'heroTitle': 'Международная логистика из Китая в Россию под ключ',
      'heroSubtitle': 'Экспедирование, таможенное оформление и доставка — без лишних посредников',
      // Navigation
      'services': 'Услуги',
      'news': 'Новости и проекты',
      'contacts': 'Контакты',
      // Statistics
      'activeClients': 'ДЕЙСТВУЮЩИХ КЛИЕНТОВ',
      'completedProjects': 'ЗАВЕРШЕННЫХ ПРОЕКТОВ',
      'yearsOfExperience': 'ЛЕТ НА РЫНКЕ',
      'cargoProcessed': 'ОБРАБОТАНО ГРУЗОВ',
      // Services
      'autoTransport': 'Автоперевозки',
      'expediting': 'Экспедирование',
      'import': 'Импорт из Китая',
      'export': 'Экспорт',
      'customs': 'Таможенное оформление',
      // Footer
      'privacy': 'Политика конфиденциальности',
      // How We Work
      'howWeWork': 'Как мы работаем',
      // Why XGLOG
      'whyXGLOG': 'Почему XGLOG',
      // Geography
      'geography': 'География',
      // Application Form
      'applicationForm': 'Оставить заявку',
    },
    zh: {
      // Header
      'calculate': '计算运费',
      'workingHours': '工作时间：周一至周五 10:00-19:00',
      // Hero
      'heroTitle': '从中国到俄罗斯的国际物流一站式服务',
      'heroSubtitle': '运输、清关和交付 — 无多余中间商',
      // Navigation
      'services': '服务',
      'news': '新闻和项目',
      'contacts': '联系方式',
      // Statistics
      'activeClients': '活跃客户',
      'completedProjects': '已完成项目',
      'yearsOfExperience': '市场经验',
      'cargoProcessed': '处理货物',
      // Services
      'autoTransport': '汽车运输',
      'expediting': '运输代理',
      'import': '从中国进口',
      'export': '出口',
      'customs': '清关',
      // Footer
      'privacy': '隐私政策',
      // How We Work
      'howWeWork': '我们的工作方式',
      // Why XGLOG
      'whyXGLOG': '为什么选择 XGLOG',
      // Geography
      'geography': '服务范围',
      // Application Form
      'applicationForm': '提交申请',
    }
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
