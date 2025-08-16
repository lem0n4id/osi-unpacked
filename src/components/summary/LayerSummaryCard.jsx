import { LAYERS } from "../../data/layers";

export default function LayerSummaryCard({ layer, delay }) {
  const { Icon } = layer;
  return (
    <div
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 flex items-center gap-4"
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      <div className="text-green-400">
        <Icon size={32} />
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold">
          {layer.id}: {layer.name}
        </h3>
        <p className="text-gray-400">{layer.shortDesc}</p>
      </div>
    </div>
  );
}
