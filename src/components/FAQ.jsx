import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './FAQ.css'

const FAQ = () => {
  const { language } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = language === 'ru' ? [
    {
      question: 'Как быстро вы обрабатываете заявку?',
      answer: 'Ваш запрос попадает к нашему логисту в течение нескольких минут. Мы подготовим коммерческое предложение в течение 15 минут или 1 часа в зависимости от сложности запроса.'
    },
    {
      question: 'Какие документы нужны для оформления груза?',
      answer: 'Для импорта из Китая обычно требуется: инвойс, упаковочный лист, сертификат происхождения, договор купли-продажи. Мы поможем подготовить все необходимые документы.'
    },
    {
      question: 'Сколько времени занимает доставка из Китая в Россию?',
      answer: 'Сроки доставки зависят от выбранного способа: автоперевозки - 15-25 дней, ж/д - 20-30 дней, морской транспорт - 30-45 дней. Точные сроки рассчитываются индивидуально.'
    },
    {
      question: 'Работаете ли вы с опасными грузами?',
      answer: 'Да, мы организуем перевозку опасных грузов с соблюдением всех требований безопасности и необходимых разрешений.'
    },
    {
      question: 'Как происходит оплата услуг?',
      answer: 'Оплата производится по договору. Мы работаем как с предоплатой, так и с оплатой по факту оказания услуг. Условия обсуждаются индивидуально.'
    },
    {
      question: 'Предоставляете ли вы услуги страхования груза?',
      answer: 'Мы организуем страхование грузов через наших партнёров. Страхование оформляется по желанию клиента.'
    }
  ] : [
    {
      question: '您处理申请的速度有多快？',
      answer: '您的请求会在几分钟内传达给我们的物流专家。我们将在15分钟或1小时内准备商业提案，具体取决于请求的复杂性。'
    },
    {
      question: '办理货物需要哪些文件？',
      answer: '从中国进口通常需要：发票、装箱单、原产地证书、买卖合同。我们将帮助准备所有必要的文件。'
    },
    {
      question: '从中国到俄罗斯的运输需要多长时间？',
      answer: '运输时间取决于选择的方式：汽车运输 - 15-25天，铁路 - 20-30天，海运 - 30-45天。具体时间单独计算。'
    },
    {
      question: '您是否处理危险品？',
      answer: '是的，我们组织危险品运输，遵守所有安全要求和必要的许可。'
    },
    {
      question: '如何支付服务费用？',
      answer: '根据合同支付。我们既接受预付款，也接受服务完成后付款。条件单独讨论。'
    },
    {
      question: '您是否提供货物保险服务？',
      answer: '我们通过合作伙伴组织货物保险。保险根据客户意愿办理。'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq-section" className="faq">
      <div className="container">
        <h2 className="section-title">
          {language === 'ru' ? 'Часто задаваемые вопросы' : '常见问题'}
        </h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
