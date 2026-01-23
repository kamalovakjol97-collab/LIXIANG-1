import './Services.css'

const Services = () => {
  const services = [
    {
      title: 'Импорт из Китая',
      description: 'Экспедирование, консолидация, организация маршрутов'
    },
    {
      title: 'Таможенное оформление',
      description: 'Подготовка документов, сопровождение процедур'
    },
    {
      title: 'Автоперевозки с Китая, по РФ',
      description: 'Координация доставки до клиента'
    },
    {
      title: 'Страхование грузов',
      description: 'Организация страхования через партнёров'
    },
    {
      title: 'E-commerce логистика',
      description: 'Комплексное решение для интернет-торговли'
    }
  ]

  return (
    <section className="services">
      <div className="container">
        <h2 className="section-title">Услуги</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
