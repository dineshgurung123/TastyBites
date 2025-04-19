import React from 'react';

const About = () => {
  return (
    <div className="font-sans bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-red-500 text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to TastyBites</h1>
        <p className="text-xl mb-6">A delightful culinary experience that will excite your taste buds!</p>
        <button className="bg-white text-gray-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
          Explore Our Menu
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">About TastyBites</h2>
          <p className="text-xl text-gray-600">
            TastyBites is a place where food meets passion. We believe in bringing you the freshest, most flavorful dishes made from the finest ingredients. Whether you're craving a classic comfort food or something exotic, TastyBites has got something for everyone.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Delicious Dishes</h3>
              <p className="text-gray-600">
                From gourmet dishes to casual snacks, each bite is packed with flavor and freshness.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Customizable Menus</h3>
              <p className="text-gray-600">
                We offer a wide variety of choices with options to personalize your meals.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your tasty meals delivered straight to your doorstep in no time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 mb-8">Have any questions or special requests? We're here to help!</p>
          <button className="bg-red-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition duration-300">
            Get In Touch
          </button>
        </div>
      </section>

      
    </div>
  );
};

export default About;
