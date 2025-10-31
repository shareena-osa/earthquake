import React from 'react';

const Sidebar = ({ minMagnitude, setMinMagnitude, selectedCountry, setSelectedCountry, countries, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`bg-gray-100 transition-all duration-300 ease-in-out fixed md:relative inset-y-0 left-0 z-50 md:z-auto ${
          isOpen ? 'w-64 p-4' : 'w-0 p-0'
        } md:w-64 md:p-4 md:block ${isOpen ? 'block' : 'hidden'} overflow-hidden overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            className="md:hidden p-2 hover:bg-gray-200 rounded"
            onClick={() => setIsOpen(false)}
            aria-label="Close filters"
          >
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
        </div>
        <div>
          <label htmlFor="min-magnitude" className="block text-sm font-medium text-gray-700 mb-2">
            Min Magnitude: <span className="font-semibold">{minMagnitude}</span>
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
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="mt-6">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            id="country"
            name="country"
            className="w-full border border-gray-300 rounded-md p-2.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
    </>
  );
};

export default Sidebar;