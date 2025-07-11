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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Device Dashboard (Live)</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {pagedDevices.map((device) => (
          <DeviceCard key={device.deviceId} device={device} />
        ))}
      </div>

      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(devices.length / itemsPerPage) }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white text-gray-800"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
