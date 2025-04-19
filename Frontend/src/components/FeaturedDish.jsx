import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Card'

const FeaturedDish = () => {
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
    <div className="px-4 py-8 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Dishes</h2>
      {
        food.length > 0  ? (
          <div className="flex flex-wrap justify-center gap-6">
            {food.slice(0,8).map((item) => (
              <Card key={item._id} food={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )
      }
    </div>
  )
}

export default FeaturedDish
