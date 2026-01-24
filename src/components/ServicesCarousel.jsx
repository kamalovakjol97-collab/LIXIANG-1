import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useLanguage } from '../context/LanguageContext'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './ServicesCarousel.css'

const ServicesCarousel = () => {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState(0)

  const categories = [
    {
      id: 0,
      name: language === 'ru' ? 'По виду транспорта' : '按运输方式',
      services: [
        {
          id: 't1',
          title: language === 'ru' ? 'Контейнерные перевозки' : '集装箱运输',
          image: '/assets/service-import.png',
          subs: language === 'ru' 
            ? ['FCL (Полные контейнеры)', 'LCL (Сборные грузы)', 'Мультимодальные схемы']
            : ['FCL (整箱)', 'LCL (拼箱)', '多式联运']
        },
        {
          id: 't2',
          title: language === 'ru' ? 'Автомобильные перевозки' : '公路运输',
          image: '/assets/service-auto.png',
          subs: language === 'ru'
            ? ['FTL (Полные фуры)', 'LTL (Сборные машины)', 'Негабаритные грузы']
            : ['FTL (整车)', 'LTL (零担)', '超大货物']
        },
        {
          id: 't3',
          title: language === 'ru' ? 'Железнодорожные перевозки' : '铁路运输',
          image: '/assets/service-import.png', // Using import as a placeholder for rail if rail image is missing
          subs: language === 'ru'
            ? ['Контейнерные поезда', 'Повагонные отправки', 'Платформы для спецтехники']
            : ['集装箱班列', '整车运输', '特种设备平台']
        },
        {
          id: 't4',
          title: language === 'ru' ? 'Морские перевозки' : '海运',
          image: '/assets/service-export.png', // Using export as a placeholder for sea
          subs: language === 'ru'
            ? ['Линейный сервис', 'Фрахтование судов', 'Портовое экспедирование']
            : ['班轮服务', '船舶租箱', '港口货运代理']
        }
      ]
    },
    {
      id: 1,
      name: language === 'ru' ? 'По виду перевозок' : '按运输类型',
      services: [
        {
          id: 'p1',
          title: language === 'ru' ? 'Импорт из Китая' : '从中国进口',
          image: '/assets/service-import.png',
          subs: language === 'ru'
            ? ['Поиск поставщиков', 'Инспекция качества', 'Таможенное оформление']
            : ['寻找供应商', '质量检验', '海关清关']
        },
        {
          id: 'p2',
          title: language === 'ru' ? 'Экспорт в Китай' : '向中国出口',
          image: '/assets/service-export.png',
          subs: language === 'ru'
            ? ['Сертификация', 'Логистическое планирование', 'Юридическая поддержка']
            : ['认证', '物流规划', '法律支持']
        },
        {
          id: 'p3',
          title: language === 'ru' ? 'Внутрироссийские перевозки' : '俄罗斯境内运输',
          image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
          subs: language === 'ru'
            ? ['Региональная сеть', 'Складское хранение', 'Дистрибуция']
            : ['区域网络', '仓库储存', '分销']
        }
      ]
    },
    {
      id: 2,
      name: language === 'ru' ? 'Отраслевые решения' : '行业解决方案',
      services: [
        {
          id: 'o1',
          title: language === 'ru' ? 'Негабаритные грузы' : '超大货物',
          image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
          subs: language === 'ru'
            ? ['Проектная логистика', 'Разрешения на перевозку', 'Сопровождение']
            : ['项目物流', '运输许可', '押运']
        },
        {
          id: 'o2',
          title: language === 'ru' ? 'Сборные грузы' : '拼箱货',
          image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&w=800&q=80',
          subs: language === 'ru'
            ? ['Консолидация на складах', 'Регулярный график', 'Страхование грузов']
            : ['仓库拼货', '定期排班', '货物保险']
        }
      ]
    }
  ]

  return (
    <section className="services-section-new">
      <div className="container">
        <div className="services-header-modern">
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="category-title-wrap">
            <h2 className="cat-title">
              <span className="accent-text">{categories[activeCategory].name.split(' ')[0]}</span>{' '}
              {categories[activeCategory].name.split(' ').slice(1).join(' ')}
            </h2>
          </div>
        </div>

        <div className="carousel-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 }
            }}
            className="services-swiper"
          >
            {categories[activeCategory].services.map((service) => (
              <SwiperSlide key={service.id}>
                <div className="service-card-modern">
                  <div className="service-image-wrap">
                    <img src={service.image} alt={service.title} />
                    <div className="service-overlay-modern">
                      <h3 className="service-card-title">{service.title}</h3>
                      <ul className="sub-services-list">
                        {service.subs.map((sub, i) => (
                          <li key={i}>{sub}</li>
                        ))}
                      </ul>
                      <button className="service-learn-more">
                        {language === 'ru' ? 'Подробнее' : '了解更多'}
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="services-bottom-info">
          <p className="bottom-text">
            {language === 'ru' 
              ? 'Мы предлагаем оказание логистических услуг под ключ: подбор маршрута, оформление документов, таможенное сопровождение, контроль сроков и состояния груза.'
              : '我们提供一站式物流服务：路线选择、文件办理、海关支持、进度和货物状态控制。'}
          </p>
          <h3 className="bottom-slogan">
            {language === 'ru' ? 'Логистика, которая помогает бизнесу работать быстрее' : '助您业务提速的物流'}
          </h3>
        </div>
      </div>
    </section>
  )
}

export default ServicesCarousel
