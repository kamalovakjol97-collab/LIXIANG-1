import Logo from './Logo'
import './Header.css'

const Header = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Logo />
          <button className="header-cta" onClick={scrollToForm}>
            Рассчитать доставку
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
