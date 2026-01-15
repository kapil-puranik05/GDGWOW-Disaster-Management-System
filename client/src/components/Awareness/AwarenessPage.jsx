// src/components/AwarenessPage.jsx
import React, { useState } from "react";
import DisasterSelector from "./DisasterSelector.jsx";
import PrecautionDisplay from "./PrecautionDisplay.jsx";

const disasterPrecautions = {
  Earthquake: [
    "Drop, Cover, and Hold On",
    "Stay away from glass/windows",
    "If outside, move away from buildings",
  ],
  Flood: [
    "Move to higher ground",
    "Avoid contact with floodwater",
    "Don’t drive in flooded areas",
  ],
  Tornado: [
    "Go to a basement or interior room",
    "Avoid windows",
    "Cover your head",
  ],
  Landslide: [
    "Listen for unusual sounds",
    "Stay alert during heavy rain",
    "Move away from steep slopes",
  ],
};

function AwarenessPage() {
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  return (
    <div className="min-h-screen bg-[#f5e47f] text-black flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Disaster Awareness</h1>

      <DisasterSelector onSelect={setSelectedDisaster} />

      <div className="mt-10 w-full max-w-4xl bg-white-800 rounded-xl p-6 shadow-xl">
        {selectedDisaster && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {selectedDisaster} Precautions
            </h2>
            <PrecautionDisplay
              disaster={selectedDisaster}
              precautions={disasterPrecautions[selectedDisaster]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AwarenessPage;
