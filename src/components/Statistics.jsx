import { useLanguage } from '../context/LanguageContext'
import './Statistics.css'

const Statistics = () => {
  const { t } = useLanguage()

  const stats = [
    {
      number: '>600',
      label: t('activeClients')
    },
    {
      number: '>1200',
      label: t('completedProjects')
    },
    {
      number: '15+',
      label: t('yearsOfExperience')
    },
    {
      number: '>5000',
      label: t('cargoProcessed')
    }
  ]

  return (
    <section className="statistics">
      <div className="container">
        <div className="statistics-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statistics
