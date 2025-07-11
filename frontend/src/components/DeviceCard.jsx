import { useNavigate } from "react-router-dom";

export default function DeviceCard({ device }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-2">Device {device.deviceId}</h2>

      {/* Line Status */}
      <div className="space-y-1">
        {device.lines.map((line, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>Line {line.line}</span>
            <span className={line.status === "ACTIVE" ? "text-green-600" : "text-gray-500"}>
              {line.status}
            </span>
          </div>
        ))}
      </div>

      {/* Radio Status */}
      <div className="flex justify-between mt-2 text-sm">
        <span>Radio</span>
        <span className={device.radio.status === "ON" ? "text-blue-600" : "text-gray-500"}>
          {device.radio.status}
        </span>
      </div>

      {/* Voltage & Channel */}
      <div className="text-xs mt-2 text-gray-600">
        <p>Voltage: {device.voltage}v</p>
        <p>Channel: {device.channel}</p>
        <p>Last Updated: {new Date(device.timestamp).toLocaleTimeString()}</p>
      </div>

      {/* Recordings Button */}
      <button
        onClick={() => navigate(`/device/${device.deviceId}/recordings`)}
        className="mt-3 w-full py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Recordings
      </button>
    </div>
  );
}
