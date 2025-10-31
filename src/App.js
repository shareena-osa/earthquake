import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [filteredEarthquakes, setFilteredEarthquakes] = useState([]);
  const [minMagnitude, setMinMagnitude] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEarthquakes(data.features);
        setFilteredEarthquakes(data.features);

        // derive countries list from place strings
        const countrySet = new Set();
        for (const feature of data.features) {
          const place = feature?.properties?.place || '';
          const parts = place.split(',').map(p => p.trim()).filter(Boolean);
          const candidate = parts.length > 1 ? parts[parts.length - 1] : (parts[0] || '');
          if (candidate) {
            countrySet.add(candidate);
          }
        }
        const countryArray = Array.from(countrySet).sort((a, b) => a.localeCompare(b));
        setCountries(countryArray);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, []);

  useEffect(() => {
    let filtered = earthquakes;

    if (minMagnitude > 0) {
      filtered = filtered.filter(quake => quake.properties.mag >= minMagnitude);
    }

    if (selectedCountry) {
      filtered = filtered.filter(quake => {
        const place = quake?.properties?.place || '';
        const parts = place.split(',').map(p => p.trim()).filter(Boolean);
        const country = parts.length > 1 ? parts[parts.length - 1] : (parts[0] || '');
        return country.toLowerCase() === selectedCountry.toLowerCase();
      });
    }

    setFilteredEarthquakes(filtered);
  }, [minMagnitude, selectedCountry, earthquakes]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        minMagnitude={minMagnitude}
        setMinMagnitude={setMinMagnitude}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        countries={countries}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <button
          className="md:hidden fixed top-4 left-4 z-30 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle filters"
        >
          {isSidebarOpen ? '✕ Close' : '☰ Filters'}
        </button>
        <div className="flex-1 relative w-full h-full">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading earthquakes...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10 p-4">
              <div className="text-center max-w-md">
                <p className="text-red-600 font-semibold mb-2">Error loading data</p>
                <p className="text-gray-600 text-sm">{error.message}</p>
              </div>
            </div>
          )}
          {!loading && !error && (
            <div className="w-full h-full">
              <Map earthquakes={filteredEarthquakes} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;