import { useLanguage } from '../context/LanguageContext'
import './WhyXGLOG.css'

const WhyXGLOG = () => {
  const { t, language } = useLanguage()
  
  const advantages = language === 'ru' ? [
    {
      icon: '🤝',
      text: 'Не перевозчик, а ваш логистический партнер. Берем на себя всю организацию, документы и решение проблем.'
    },
    {
      icon: '🧳',
      text: 'Заботимся о грузе как о своем. Ваши товары в надежных руках на всем пути от Китая до дверей в России.'
    },
    {
      icon: '⚡',
      text: 'Прозрачность на каждом этапе. Вы в курсе статуса груза и всех этапов без лишних звонков.'
    },
    {
      icon: '🗣️',
      text: 'Говорим с вами на одном языке. Билингвальная поддержка (русский/китайский) упрощает работу для китайских и российских клиентов.'
    },
    {
      icon: '🚀',
      text: 'Специализация: Китай → Россия. Глубокое знание специфики этих направлений — ваше преимущество.'
    },
    {
      icon: '✅',
      text: 'Не просто сообщаем о проблеме — предлагаем решение. Решаем сложности вместе с вами, а не перекладываем ответственность.'
    }
  ] : [
    {
      icon: '🤝',
      text: '不是承运商，而是您的物流合作伙伴。我们承担所有组织、文件和问题解决工作。'
    },
    {
      icon: '🧳',
      text: '像对待自己的货物一样关心。您的货物从中国到俄罗斯门口全程都在可靠的手中。'
    },
    {
      icon: '⚡',
      text: '每个阶段都透明。您了解货物状态和所有阶段，无需额外电话。'
    },
    {
      icon: '🗣️',
      text: '用您的语言交流。双语支持（俄语/中文）简化了中国和俄罗斯客户的工作。'
    },
    {
      icon: '🚀',
      text: '专业领域：中国 → 俄罗斯。对这些方向的深入了解是您的优势。'
    },
    {
      icon: '✅',
      text: '不仅仅是报告问题 — 我们提供解决方案。我们与您一起解决困难，而不是推卸责任。'
    }
  ]

  return (
    <section className="why-xglog">
      <div className="container">
        <h2 className="section-title">
          {language === 'ru' ? 'Почему XGL' : '为什么选择 XGL'}
        </h2>
        <p className="why-xglog-subtitle">
          {language === 'ru' 
            ? 'Ваш надежный партнер в логистике из Китая'
            : '您在中国物流方面的可靠合作伙伴'}
        </p>
        <div className="advantages-list">
          {advantages.map((advantage, index) => (
            <div key={index} className="advantage-item">
              <div className="advantage-icon">{advantage.icon}</div>
              <p className="advantage-text">{advantage.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyXGLOG
