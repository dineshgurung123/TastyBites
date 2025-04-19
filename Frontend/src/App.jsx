import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Welcome from './components/Welcome'
import FeaturedDish from './components/FeaturedDish'
import AddFood from './components/AddFood'
import FoodDetail from './components/FoodDetails'
import FoodItems from './components/FoodItems'
import Register from './components/Register'
import Login from './components/Login'
import CartPage from './components/CartPage'
import About from './components/About'
import Feedback from './components/Feedback'
import Footer from './components/Footer'
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Welcome />
            <FeaturedDish />
            <About/>
            <Feedback/>
            <Footer/>
          </>
        } />
        
        <Route path='/addFood' element = {<AddFood/>} />
        <Route path='/foods/:id' element = {<FoodDetail/>} />
        <Route path='/foods' element = {<FoodItems/>}/>
        <Route path='/register' element = {<Register/>}/>
         <Route path='/login' element = {<Login/>}/>
         <Route path='/cart' element = {<CartPage/>}/>
         

      </Routes>
    </Router>
  )
}

export default App
