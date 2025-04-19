import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const FoodDetail = () => {
  const { id } = useParams()
  const [food, setFood] = useState(null)

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/foods/${id}`)
        setFood(response.data.data)
      } catch (error) {
        console.error("Error fetching food details:", error)
      }
    }

    fetchFood()
  }, [id])

  const handleAddToCart = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/carts", {
        foodId: food._id
      })
      alert("Added to cart successfully!")
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("Failed to add to cart.")
    }
  }

  const handleOrderNow = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/orders", {
        foodId: food._id
      })
      alert("Order placed successfully!")
    } catch (error) {
      console.error("Error placing order:", error)
      alert("Failed to place order.")
    }
  }

  if (!food) {
    return <p className="text-center mt-10 text-gray-500">Loading food details...</p>
  }

  return (
    <div className="max-w-2xl mx-auto mt-24 px-4 py-10 bg-white shadow-md rounded-lg">
      <img
        src={food.imageUrl}
        alt={food.name}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{food.name}</h1>
      <p className="text-gray-700 text-lg mb-4">{food.description}</p>
      <p className="text-xl font-semibold text-blue-600 mb-2">Price: Rs. {food.price}</p>
      <p className="text-md font-medium text-gray-600 mb-6">Category: {food.category}</p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200"
        >
          Add to Cart
        </button>
        <button
          onClick={handleOrderNow}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Order Now
        </button>
      </div>
    </div>
  )
}

export default FoodDetail
