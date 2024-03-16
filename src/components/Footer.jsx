 import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 absolute bottom-0 w-full">
      © {new Date().getFullYear()} Daily-Tasks TZ. All Rights Reserved.
    </footer>
  );
};

export default Footer;
