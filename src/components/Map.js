import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { format } from 'date-fns';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ earthquakes }) => {
  const getMarkerColor = (magnitude) => {
    if (magnitude < 1) return '#00bfff'; // Deep Sky Blue
    if (magnitude < 3) return '#00ff00'; // Lime Green
    if (magnitude < 5) return '#ffff00'; // Yellow
    if (magnitude < 7) return '#ffa500'; // Orange
    return '#ff0000'; // Red
  };

  const getMarkerRadius = (magnitude) => {
    return magnitude * 4;
  };

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {earthquakes.map(earthquake => (
        <CircleMarker
          key={earthquake.id}
          center={[earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]]}
          pathOptions={{
            color: getMarkerColor(earthquake.properties.mag),
            fillColor: getMarkerColor(earthquake.properties.mag),
            fillOpacity: 0.7,
          }}
          radius={getMarkerRadius(earthquake.properties.mag)}
        >
          <Popup>
            <strong>{earthquake.properties.place}</strong>
            <br />
            Magnitude: {earthquake.properties.mag}
            <br />
            Time: {format(new Date(earthquake.properties.time), 'yyyy-MM-dd HH:mm:ss')}
            <br />
            Depth: {earthquake.geometry.coordinates[2]} km
            <br />
            <a href={earthquake.properties.url} target="_blank" rel="noopener noreferrer">
              More Info
            </a>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default Map;