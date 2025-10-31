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
    <div className="flex h-screen">
      <Sidebar
        minMagnitude={minMagnitude}
        setMinMagnitude={setMinMagnitude}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        countries={countries}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        <button
          className="md:hidden p-2 bg-gray-200"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? 'Close' : 'Open'} Filters
        </button>
        <div className="flex-1">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {!loading && !error && <Map earthquakes={filteredEarthquakes} />}
        </div>
      </div>
    </div>
  );
}

export default App;