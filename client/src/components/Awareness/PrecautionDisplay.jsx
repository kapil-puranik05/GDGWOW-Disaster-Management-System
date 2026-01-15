import React from "react";

const PrecautionDisplay = ({ disaster, precautions }) => {
  return (
    <div className="max-w-xl mx-auto bg-[#fdf6c2] p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-black-700 mb-4">
        Precautions for {disaster}
      </h2>
      <ul className="text-2xl  list-disc list-inside text-black-800">
        {precautions.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default PrecautionDisplay;
