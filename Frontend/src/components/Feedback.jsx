import React from 'react';

const Feedback = () => {
  // Static feedback data with feedback from 3 people
  const feedbacks = [
    {
      name: "John Doe",
      feedback: "The food was absolutely amazing! The pizza was crispy and full of flavor. Highly recommend!"
    },
    {
      name: "Jane Smith",
      feedback: "I had a wonderful experience. The ambiance was perfect for a dinner date, and the service was top-notch."
    },
    {
      name: "Michael Johnson",
      feedback: "Fast service and great staff! The burger was juicy, and the fries were perfectly crispy. Will come back again!"
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-blue-500 via-teal-400 to-purple-500 rounded-lg shadow-xl">
      <h2 className="text-4xl font-bold text-white text-center mb-8">Customer Feedback</h2>
      
      {/* Display Static Feedback */}
      <div className="space-y-8">
        {feedbacks.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-2xl transform hover:scale-105 transition duration-500">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex justify-center items-center">
                <span className="text-2xl font-semibold text-blue-600">{item.name[0]}</span>
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">Customer</p>
              </div>
            </div>
            <p className="text-lg text-gray-700">{item.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
