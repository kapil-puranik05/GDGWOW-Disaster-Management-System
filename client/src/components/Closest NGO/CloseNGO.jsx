import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const calamities = ['Cyclone', 'Flood', 'Fire', 'Earthquake', 'Landslide'];

const UserLocationMap = () => {
  const [position, setPosition] = useState(null);
  const [selectedCalamity, setSelectedCalamity] = useState(calamities[0]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (err) => {
        console.error(err);
        alert('Failed to fetch location');
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center p-4 gap-4 bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Disaster Tracker Map</h1>

      <div className="w-full max-w-md">
        <label className="block mb-2 text-lg font-medium text-gray-700">Select Natural Calamity:</label>
        <select
          value={selectedCalamity}
          onChange={(e) => setSelectedCalamity(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
        >
          {calamities.map((calamity) => (
            <option key={calamity} value={calamity}>
              {calamity}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-4xl h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-300">
        {position ? (
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker
              position={position}
              icon={L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            >
              <Popup>
                <strong>{selectedCalamity} Alert</strong><br />
                Your Location<br />
                Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p className="text-center text-gray-600">Loading your location...</p>
        )}
      </div>
    </div>
  );
};

export default UserLocationMap;
