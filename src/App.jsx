import React from 'react'
import HeroSection from './components/HeroSection'
import Header from './components/Header'
import Layout from './components/Layout/Layout'
import { Routes , Route } from 'react-router-dom'
import Hero from './pages/Hero'
import Shop from './pages/Shop'
import Blog from './pages/Blog'
import About from './pages/About'
import Contact from './pages/Contact'
import CategorySection from './components/CategorySection'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'

const App = () => {
  return (
   <>
   <Routes>
    <Route element={<Layout/>}>
    <Route path='/' element={<Hero/>}/>
    <Route path='/shop' element={<Shop/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/blogs' element={<Blog/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/product/:id' element={<ProductDetails/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/categories' element={<CategorySection variant='page'/>}/>
    </Route>
   </Routes>
   </>
  )
}

export default App