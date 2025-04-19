import React from 'react';

const Card = ({ food }) => {
    return (
        <div className="w-full sm:w-72 rounded-xl overflow-hidden shadow-lg bg-white hover:scale-105 transition-transform duration-300">
            <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{food.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{food.description}</p>
                <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-green-600">${food.price}</p>
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">{food.category}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
