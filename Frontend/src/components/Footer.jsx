import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg">© 2025 TastyBites. All Rights Reserved.</p>
        <div className="mt-4">
          <a href="#" className="text-blue-400 hover:text-blue-600 mx-2">Privacy Policy</a>
          <a href="#" className="text-blue-400 hover:text-blue-600 mx-2">Terms of Service</a>
          <a href="#" className="text-blue-400 hover:text-blue-600 mx-2">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
