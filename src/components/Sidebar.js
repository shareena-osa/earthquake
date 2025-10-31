import React from 'react';

const Sidebar = ({ minMagnitude, setMinMagnitude, selectedCountry, setSelectedCountry, countries, isOpen, setIsOpen }) => {
  return (
    <div
      className={`bg-gray-100 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64 p-4' : 'w-0 p-0'
      } md:w-64 md:p-4 md:block ${isOpen ? 'block' : 'hidden'} overflow-hidden`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        {isOpen && (
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <div>
        <label htmlFor="min-magnitude" className="block text-sm font-medium text-gray-700">
          Min Magnitude: {minMagnitude}
        </label>
        <input
          type="range"
          id="min-magnitude"
          name="min-magnitude"
          min="0"
          max="10"
          step="0.1"
          value={minMagnitude}
          onChange={(e) => setMinMagnitude(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          id="country"
          name="country"
          className="w-full border border-gray-300 rounded-md p-2 bg-white"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">All countries</option>
          {countries && countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;