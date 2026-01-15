import React from "react";

const disasterData = [
  { name: "Earthquake", source: "/videos/Earthquake.mp4" },
  { name: "Flood", source: "/videos/Flood.mp4" },
  { name: "Tornado", source: "/videos/Tornado.mp4" },
  { name: "Landslide", source: "/videos/Landslide.mp4" },
];

const DisasterSelector = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {disasterData.map(({ name, source }) => (
        <div
          key={name}
          className="w-64 cursor-pointer bg-[#fdf6c2] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105"
          onClick={() => onSelect(name)}
        >
          <video
            className="w-full h-40 object-cover"
            src={source}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="p-4 text-center">
            <h2 className="text-xl font-bold text-black-700">{name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisasterSelector;
