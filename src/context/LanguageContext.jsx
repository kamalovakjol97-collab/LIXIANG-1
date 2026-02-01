import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru')

  const translations = {
    ru: {
      services: 'Услуги',
      partners: 'Партнёры',
      news: 'Новости',
      contacts: 'Контакты',
      calculate: 'Рассчитать',
      workingHours: 'Пн-Пт 10:00 - 19:00',
      topBarSchedule: 'График работы: пн.-пт. с 10.00 до 19.00',
      heroSubtitle: 'Международная логистика полного цикла',
      backToTop: 'Наверх',
      heroCta: 'Рассчитать стоимость',
      heroCtaHover: 'Запуск расчёта…'
    },
    zh: {
      services: '服务',
      partners: '合作伙伴',
      news: '新闻',
      contacts: '联系方式',
      calculate: '计算',
      workingHours: '周一至周五 10:00 - 19:00',
      topBarSchedule: '工作时间：周一至周五 10:00 - 19:00',
      heroSubtitle: '全周期国际物流',
      backToTop: '回到顶部',
      heroCta: '计算费用',
      heroCtaHover: '开始计算…'
    }
  }

  const t = (key) => translations[language][key] || key

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
