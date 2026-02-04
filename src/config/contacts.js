// Единый источник контактов для TopBar, Footer и ссылок Telegram/WhatsApp
const PHONE_RAW = '79315084299'
const PHONE_DISPLAY = '+ 7 931 508 4299'
const EMAIL = 'i@x-genity.ru'

export const contacts = {
  phone: PHONE_RAW,
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: `tel:+${PHONE_RAW}`,
  email: EMAIL,
  whatsappUrl: `https://wa.me/${PHONE_RAW}`,
  telegramUrl: `https://t.me/+${PHONE_RAW}`,
}

export default contacts
