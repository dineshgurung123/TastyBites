import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Welcome from './components/Welcome'
import FeaturedDish from './components/FeaturedDish'
import AddFood from './components/AddFood'
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
      </Routes>
    </Router>
  )
}

export default App
