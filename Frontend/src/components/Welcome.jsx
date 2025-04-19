import React from 'react';

const Welcome = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden shadow-2xl">
      
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://static.vecteezy.com/system/resources/previews/015/322/833/non_2x/chicken-dish-top-view-with-wooden-pattern-background-chicken-meat-collection-chicken-food-hand-drawn-style-illustration-vintage-design-for-restaurant-menu-and-template-vector.jpg')] bg-cover bg-center z-0"></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-[2px_2px_6px_rgba(0,0,0,0.7)]">
          Discover TastyBites
        </h1>
        <h3 className="text-xl font-medium mb-2 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
          Serving delicious meals made with love and tradition.
        </h3>
      </div>
    </div>
  );
};

export default Welcome;
