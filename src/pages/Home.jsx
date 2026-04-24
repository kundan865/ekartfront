import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <Hero />
      </div>
      <Features />
      <Footer />
    </div>
  )
}

export default Home
