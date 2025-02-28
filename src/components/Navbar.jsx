import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-800 text-white py-4 px-8 flex justify-between">
      <h1 className="text-2xl font-bold">Cricbuzz Clone</h1>
      <ul className="flex gap-6">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/matches">Matches</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
