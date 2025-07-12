import { useState, useEffect } from "react";
import DeviceCard from "../components/DeviceCard";
import socket from "../lib/socket";

export default function DashboardPage() {
  const [devices, setDevices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Initialize 20 device slots
  useEffect(() => {
    const emptyDevices = Array.from({ length: 20 }).map((_, i) => ({
      deviceId: i + 1,
      lines: [1, 2, 3].map((line) => ({
        line,
        status: "IDLE",
      })),
      radio: {
        channel: "R1",
        status: "OFF",
      },
      voltage: "0.00",
      channel: "A1",
      timestamp: new Date().toISOString(),
    }));

    setDevices(emptyDevices);
  }, []);

  // Listen to WebSocket updates
  useEffect(() => {
    socket.on("devicePackets", (packets) => {
      setDevices((prev) => {
        const updated = [...prev];
        packets.forEach((packet) => {
          const index = updated.findIndex((d) => d.deviceId === packet.deviceId);
          if (index !== -1) {
            updated[index] = { ...updated[index], ...packet };
          }
        });
        return updated;
      });
    });

    return () => socket.off("devicePackets");
  }, []);

  // Pagination logic
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pagedDevices = devices.slice(start, end);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Device Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="inline-flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Live monitoring • {devices.length} devices
                  </span>
                </p>
              </div>
            </div>
            
            {/* Status Summary */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{devices.filter(d => d.lines.some(l => l.status === 'ACTIVE')).length}</div>
                <div className="text-xs text-gray-500">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{devices.filter(d => d.lines.every(l => l.status === 'IDLE')).length}</div>
                <div className="text-xs text-gray-500">Idle</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">0</div>
                <div className="text-xs text-gray-500">Offline</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Devices Grid */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Connected Devices</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Page {currentPage} of {Math.ceil(devices.length / itemsPerPage)}</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pagedDevices.map((device) => (
                <div key={device.deviceId} className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <DeviceCard device={device} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
            <div className="flex items-center space-x-1">
              {/* Previous Button */}
              <button
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentPage === 1 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: Math.ceil(devices.length / itemsPerPage) }).map((_, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    currentPage === i + 1
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentPage === Math.ceil(devices.length / itemsPerPage)
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => setCurrentPage(Math.min(Math.ceil(devices.length / itemsPerPage), currentPage + 1))}
                disabled={currentPage === Math.ceil(devices.length / itemsPerPage)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}