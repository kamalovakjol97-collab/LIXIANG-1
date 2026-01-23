import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import HowWeWork from './components/HowWeWork'
import WhyXGLOG from './components/WhyXGLOG'
import Geography from './components/Geography'
import ApplicationForm from './components/ApplicationForm'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import './App.css'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <HowWeWork />
        <WhyXGLOG />
        <Geography />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={
            <>
              <Header />
              <PrivacyPolicy />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
