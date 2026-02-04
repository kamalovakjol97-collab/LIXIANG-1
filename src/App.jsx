import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import TopBar from './components/TopBar'
import Header from './components/Header'
import Hero from './components/Hero'
import Statistics from './components/Statistics'
import ServicesCarousel from './components/ServicesCarousel'
import HowWeWork from './components/HowWeWork'
import WhyXGLOG from './components/WhyXGLOG'
import ApplicationForm from './components/ApplicationForm'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import ServicesPage from './pages/ServicesPage'
import ContactsPage from './pages/ContactsPage'
import HistoryPage from './pages/HistoryPage'
import './App.css'

function HomePage() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Statistics />
        <hr className="section-divider" />
        <ServicesCarousel />
        <hr className="section-divider" />
        <HowWeWork />
        <hr className="section-divider" />
        <WhyXGLOG />
        <hr className="section-divider" />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={
              <>
                <TopBar />
                <Header />
                <ServicesPage />
                <Footer />
              </>
            } />
            <Route path="/history" element={
              <>
                <TopBar />
                <Header />
                <HistoryPage />
                <Footer />
              </>
            } />
            <Route path="/contacts" element={
              <>
                <TopBar />
                <Header />
                <ContactsPage />
                <Footer />
              </>
            } />
            <Route path="/faq" element={
              <>
                <TopBar />
                <Header />
                <FAQ />
                <Footer />
              </>
            } />
            <Route path="/privacy" element={
              <>
                <TopBar />
                <Header />
                <PrivacyPolicy />
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
