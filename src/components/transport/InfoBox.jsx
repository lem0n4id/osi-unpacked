import React from 'react';

const InfoBox = ({ layer }) => {
  if (!layer) return null;
  const { Icon, name, desc } = layer;
  return (
    <div className="p-4 bg-[var(--term)] border-2 border-gray-700 rounded-lg flex items-center gap-4">
      <Icon className="text-3xl text-green-400" />
      <div>
        <h3 className="font-bold text-lg text-white">
          {name} (Layer {layer.id})
        </h3>
        <p className="text-gray-300">{desc}</p>
      </div>
    </div>
  );
};

export default InfoBox;
