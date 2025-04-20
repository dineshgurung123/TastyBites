import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom' // Add this import
import Card from '../components/Card'

const FoodItems = () => {
  const [food, setFood] = useState([])

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/foods")
        setFood(response.data.data)
      } catch (error) {
        console.error("Error fetching food:", error)
      }
    }

    fetchFood()
  }, [])

  return (
    <div className="px-4 pt-28 pb-12 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">All Food Items</h2>
      {food.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-16">
          {food.map((item) => (
            <Link 
              to={`/foods/${item._id}`} // Add this Link wrapper
              key={item._id} 
              className="block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5" // Add styling as needed
            >
              <Card food={item} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  )
}

export default FoodItems