import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import GroupCompanies from '@/components/GroupCompanies'
import Workflow from '@/components/Workflow'
import Advantages from '@/components/Advantages'
import Geography from '@/components/Geography'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <GroupCompanies />
      <Workflow />
      <Advantages />
      <Geography />
      <ContactForm />
    </main>
  )
}
