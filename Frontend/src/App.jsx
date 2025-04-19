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
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Welcome />
            <FeaturedDish />
          </>
        } />
        
        <Route path='/addFood' element = {<AddFood/>} />
        <Route path='/foods/:id' element = {<FoodDetail/>} />
        <Route path='/foods' element = {<FoodItems/>}/>
        <Route path='/register' element = {<Register/>}/>
         <Route path='/login' element = {<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
