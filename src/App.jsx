import React from 'react'
import HeroSection from './components/HeroSection'
import Header from './components/Header'
import Layout from './components/Layout/Layout'
import { Routes , Route } from 'react-router-dom'
import Hero from './pages/Hero'

const App = () => {
  return (
   <>
   <Routes>
    <Route element={<Layout/>}>
    <Route path='/' element={<Hero/>}/>
    
    
    </Route>
   </Routes>
   </>
  )
}

export default App