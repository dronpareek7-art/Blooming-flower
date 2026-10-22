import React from 'react'
import HeroSection from './components/HeroSection'
import Header from './components/Header'
import Layout from './components/Layout/Layout'
import { Routes , Route } from 'react-router-dom'
import Hero from './pages/Hero'
import Shop from './pages/Shop'

const App = () => {
  return (
   <>
   <Routes>
    <Route element={<Layout/>}>
    <Route path='/' element={<Hero/>}/>
    <Route path='/shop' element={<Shop/>}/>
    
    
    </Route>
   </Routes>
   </>
  )
}

export default App