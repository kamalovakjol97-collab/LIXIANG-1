import { useLanguage } from '../context/LanguageContext'
import './ServicesPage.css'

const ServicesPage = () => {
  const { language } = useLanguage()

  const services = {
    ru: {
      auto: {
        title: 'Автоперевозки из Китая и в РФ',
        subtitle: 'Надёжная доставка грузов автомобильным транспортом',
        services: [
          'Автоперевозки по РФ: СПБ, Москва',
          'Автоперевозки из Китая в РФ через КЗХ, китайские погран переходы',
          'Автоперевозки из портов СПБ, жд станция, СВХ до склада',
          'Автоперевозки по РФ: перевозки круглого леса в контейнерах 40 футовых'
        ]
      },
      expediting: {
        title: 'Экспедирование в порту, на станции, на СВХ',
        subtitle: 'Профессиональное экспедирование грузов',
        services: [
          'Экспедирование в морских портах',
          'Экспедирование на железнодорожных станциях',
          'Экспедирование на СВХ (складах временного хранения)',
          'Координация всех этапов логистики'
        ]
      },
      import: {
        title: 'Импорт из Китая в РФ',
        subtitle: 'Комплексные решения для импорта',
        services: [
          'Сборный груз из Китая',
          'Контейнерные перевозки',
          'Опасные грузы',
          'Организация маршрутов и консолидация'
        ]
      },
      export: {
        title: 'Экспорт',
        subtitle: 'Экспортные перевозки в различные страны',
        services: [
          'Экспорт в Китай',
          'Экспорт в Египет',
          'Экспорт во Вьетнам',
          'Таможенное оформление экспортных грузов'
        ]
      },
      customs: {
        title: 'Таможенное оформление',
        subtitle: 'Полный комплекс таможенных услуг',
        services: [
          'ТО импортного груза',
          'ТО экспортного груза',
          'Транзитные декларации на погран переходах',
          'Оформление СМР',
          'Аналитика',
          'Карго грузы: переход из серой в официальную'
        ]
      }
    },
    zh: {
      auto: {
        title: '从中国和俄罗斯境内的汽车运输',
        subtitle: '可靠的汽车货物运输',
        services: [
          '俄罗斯境内运输：圣彼得堡、莫斯科',
          '从中国通过口岸、边境检查站到俄罗斯的汽车运输',
          '从圣彼得堡港口、火车站、临时仓储到仓库的运输',
          '俄罗斯境内运输：40英尺集装箱中的圆木运输'
        ]
      },
      expediting: {
        title: '在港口、车站、临时仓储的运输代理',
        subtitle: '专业的货物运输代理',
        services: [
          '海港运输代理',
          '火车站运输代理',
          '临时仓储运输代理',
          '协调所有物流阶段'
        ]
      },
      import: {
        title: '从中国进口到俄罗斯',
        subtitle: '进口综合解决方案',
        services: [
          '从中国拼箱',
          '集装箱运输',
          '危险品',
          '路线组织和货物整合'
        ]
      },
      export: {
        title: '出口',
        subtitle: '向不同国家的出口运输',
        services: [
          '出口到中国',
          '出口到埃及',
          '出口到越南',
          '出口货物清关'
        ]
      },
      customs: {
        title: '清关',
        subtitle: '完整的海关服务',
        services: [
          '进口货物清关',
          '出口货物清关',
          '边境检查站的过境申报',
          'SMR办理',
          '分析',
          '货物：从灰色转为正式'
        ]
      }
    }
  }

  const currentServices = services[language]

  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="container">
          <h1 className="services-page-title">
            {language === 'ru' ? 'Наши услуги' : '我们的服务'}
          </h1>
        </div>
      </div>
      <div className="container">
        <div className="services-list">
          {Object.entries(currentServices).map(([key, service]) => (
            <section key={key} id={key} className="service-section">
              <div className={`service-bg service-bg-${key}`}>
                <div className="service-brand">XGL</div>
              </div>
              <div className="service-content">
                <h2 className="service-title">{service.title}</h2>
                <p className="service-subtitle">{service.subtitle}</p>
                <ul className="service-items">
                  {service.services.map((item, index) => (
                    <li key={index} className="service-item">{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
