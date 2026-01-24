import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './LegalProof.css'

const LegalProof = () => {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [modalOpen, setModalOpen] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const companies = [
    {
      id: 'dongxin',
      name: language === 'ru' ? 'ООО «Дунсинь»' : '满洲里东信网络贸易有限公司',
      engName: 'Manzhouli Dongxin Network Trade Co., Ltd.',
      founded: language === 'ru' ? '25 марта 2016' : '2016年3月25日',
      capital: '1 800 000 CNY',
      location: language === 'ru' ? 'Маньчжурия, КНР' : '中国满洲里',
      status: language === 'ru' ? 'Действующая компания' : '运营中',
      role: language === 'ru' ? 'Головная компания — основатель группы' : '母公司 — 集团创始人',
      licenseImg: '/assets/c__Users_Notebook_AppData_Roaming_Cursor_User_workspaceStorage_f742ad0ad9fbd53d56a5c50ad748b463_images_Image_20260124132406-887bae52-5ef8-4d5b-819c-f75d95acce98.png'
    },
    {
      id: 'guosen',
      name: language === 'ru' ? 'ООО «Гуосен»' : '满洲里国森货运代理有限公司',
      engName: 'Manzhouli Guosen Freight Forwarding Co., Ltd.',
      founded: language === 'ru' ? '20 октября 2021' : '2021年10月20日',
      capital: '2 000 000 CNY',
      location: language === 'ru' ? 'Маньчжурия, КНР' : '中国满洲里',
      status: language === 'ru' ? 'Действующая компания' : '运营中',
      role: language === 'ru' ? 'Профильное логистическое подразделение' : '专业物流部门',
      licenseImg: '/assets/c__Users_Notebook_AppData_Roaming_Cursor_User_workspaceStorage_f742ad0ad9fbd53d56a5c50ad748b463_images_Image_20260124132623-c8d3a04e-29ad-41ab-a019-effef72d58ba.png'
    }
  ]

  const currentCompany = companies.find(c => c.id === modalOpen)

  return (
    <section className="legal-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">
          {language === 'ru' ? 'Документальное подтверждение' : '文件证明'}
        </h2>
        
        <div className="legal-grid">
          {companies.map((company, index) => (
            <div 
              key={company.id} 
              className={`legal-card card-lift ${isVisible ? 'fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="legal-header">
                <div className="legal-logo-placeholder">XGL</div>
                <div className="legal-titles">
                  <h3>{company.name}</h3>
                  <p className="eng-name">{company.engName}</p>
                  <span className="legal-role">{company.role}</span>
                </div>
              </div>
              
              <div className="legal-body">
                <div className="legal-info-item">
                  <span>{language === 'ru' ? 'Основана:' : '成立时间:'}</span>
                  <strong>{company.founded}</strong>
                </div>
                <div className="legal-info-item">
                  <span>{language === 'ru' ? 'Капитал:' : '注册资本:'}</span>
                  <strong>{company.capital}</strong>
                </div>
                <div className="legal-info-item">
                  <span>{language === 'ru' ? 'Локация:' : '地点:'}</span>
                  <strong>{company.location}</strong>
                </div>
              </div>
              
              <button className="btn-outline" onClick={() => setModalOpen(company.id)}>
                {language === 'ru' ? 'Показать лицензию' : '查看许可证'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="legal-modal" onClick={() => setModalOpen(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setModalOpen(null)}>×</button>
            <div className="modal-inner">
              <h3 className="modal-license-title">{currentCompany?.name}</h3>
              <img src={currentCompany?.licenseImg} alt="Official Chinese License" className="license-scan-img" />
              <div className="modal-note">
                <p>{language === 'ru' ? 'Официальный скан лицензии (КНР). Для верификации обратитесь в юридический отдел.' : '营业执照官方扫描件。如需验证，请联系法律部门。'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default LegalProof
