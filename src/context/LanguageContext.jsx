import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru')

  const translations = {
    ru: {
      services: 'Услуги',
      contacts: 'Контакты',
      faq: 'FAQ',
      calculate: 'Рассчитать',
      workingHours: 'Пн-Пт 10:00 - 19:00',
      topBarSchedule: 'График работы: пн.-пт. с 10.00 до 19.00',
      heroSubtitle: 'Международная логистика полного цикла',
      backToTop: 'Наверх',
      privacy: 'Политика конфиденциальности',
      footerServices: 'Услуги',
      footerCompany: 'Компания',
      footerCareer: 'Карьера',
      footerNewsProjects: 'Новости и проекты',
      footerAnswerAny: 'Ответим на любой вопрос',
      seaFreight: 'Морские перевозки',
      railFreight: 'ЖД перевозки',
      roadFreight: 'Автоперевозки',
      customsClearance: 'Таможенное оформление',
      shippingFromChina: 'Перевозки из Китая',
      shippingInRussia: 'Перевозки по России',
      whyUs: 'Почему XGL',
      documents: 'Документы',
      workSchedule: 'График работы',
      officeSpb: 'г. Санкт-Петербург',
      officeMoscow: 'г. Москва',
    },
    zh: {
      services: '服务',
      contacts: '联系方式',
      faq: '常见问题',
      calculate: '计算',
      workingHours: '周一至周五 10:00 - 19:00',
      topBarSchedule: '工作时间：周一至周五 10:00 - 19:00',
      heroSubtitle: '全周期国际物流',
      backToTop: '回到顶部',
      privacy: '隐私政策',
      footerServices: '服务',
      footerCompany: '公司',
      footerCareer: '职业',
      footerNewsProjects: '新闻与项目',
      footerAnswerAny: '解答任何问题',
      seaFreight: '海运',
      railFreight: '铁路运输',
      roadFreight: '汽车运输',
      customsClearance: '清关',
      shippingFromChina: '中国运输',
      shippingInRussia: '俄罗斯境内运输',
      whyUs: '为什么选择XGL',
      documents: '文件',
      workSchedule: '工作时间',
      officeSpb: '圣彼得堡',
      officeMoscow: '莫斯科',
    }
  }

  const t = (key) => translations[language][key] || key

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
