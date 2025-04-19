import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddFood = () => {
  const [foodData, setFoodData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: ''
  });
  const [error, setError] = useState('');

  // Check if the user is logged in and is an admin
  const isLoggedIn = localStorage.getItem('authToken'); // Assuming auth token is stored here
  const isAdmin = localStorage.getItem('role') === 'admin'; // Assuming role is stored in localStorage

  // If not logged in or not an admin, show an error message
  useEffect(() => {
    if (!isLoggedIn || !isAdmin) {
      setError('Only admin can access this page.');
    }
  }, [isLoggedIn, isAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/foods", foodData);
      console.log('Food added successfully:', response.data);
      setFoodData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: ''
      });
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  return (
    <div className='max-w-md mx-auto py-8'>
      <h2 className='text-3xl font-medium text-center text-gray-800 mb-6'>
        Add New Food Item
      </h2>

      {/* Error message for users who are not logged in or not admins */}
      {error && (
        <div className="bg-red-500 text-white p-4 mb-4 rounded-md text-center">
          {error}
        </div>
      )}

      {/* If the user is logged in and is an admin, show the form */}
      {isLoggedIn && isAdmin && (
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Food Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='name'>Food Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={foodData.name}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              value={foodData.description}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='price'>Price</label>
            <input
              type='number'
              id='price'
              name='price'
              value={foodData.price}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='imageUrl'>Image URL</label>
            <input
              type='text'
              id='imageUrl'
              name='imageUrl'
              value={foodData.imageUrl}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor='category'>Category</label>
            <input
              type='text'
              id='category'
              name='category'
              value={foodData.category}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              className='w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300'
            >
              Add Food
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddFood;
