import { useNavigate } from "react-router-dom";
import { Radio, Phone, Video } from "lucide-react";


export default function DeviceCard({ device }) {
  const navigate = useNavigate();

  const statusBadge = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    return status === "ACTIVE"
      ? `${base} bg-green-100 text-green-700`
      : `${base} bg-gray-100 text-gray-500`;
  };

  const radioBadge = (status) => {
    return status === "ON"
      ? "px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 font-medium"
      : "px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500 font-medium";
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-sm border border-gray-100 hover:shadow-lg transition">
      {/* Title */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Device {device.deviceId}</h2>
        <span className="text-xs text-gray-400">
          {new Date(device.timestamp).toLocaleTimeString()}
        </span>
      </div>

      {/* Line Status */}
      <div className="space-y-1 mb-2">
        {device.lines.map((line, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <span className="text-gray-700">Line {line.line}</span>
            <span className={statusBadge(line.status)}>{line.status}</span>
          </div>
        ))}
      </div>

      {/* Radio */}
      <div className="flex justify-between items-center text-sm mb-2">
        <span className="text-gray-700">Radio</span>
        <span className={radioBadge(device.radio.status)}>{device.radio.status}</span>
      </div>

      {/* Voltage & Channel */}
      <div className="text-xs text-gray-500 mb-3">
        <div>Voltage: {device.voltage}v</div>
        <div>Channel: {device.channel}</div>
      </div>

      {/* Recordings Button */}
      <button
        onClick={() => navigate(`/device/${device.deviceId}/recordings`)}
        className="mt-auto w-full py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
      >
        📼 View Recordings
      </button>
    </div>
  );
}
