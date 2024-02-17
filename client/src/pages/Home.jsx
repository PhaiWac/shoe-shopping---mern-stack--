import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Home/Hero'
import Search from '../components/Home/Search'
import Poppular from '../components/Home/Poppular'
import Products from '../components/Products'

function Home() {
  return (
    <>
        <Poppular/>
        <Hero/>
        <Products/>
    </>
  )
}

export default Home