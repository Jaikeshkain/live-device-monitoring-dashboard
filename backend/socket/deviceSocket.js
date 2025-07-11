module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Simulate device packets every second
    const interval = setInterval(() => {
      const packets = Array.from({ length: 5 }).map((_, i) => ({
        deviceId: i + 1,
        voltage: (Math.random() * 5 + 12).toFixed(2),
        channel: "A" + Math.ceil(Math.random() * 3),
        timestamp: new Date().toISOString(),
        lines: [1, 2, 3].map((line) => ({
          line,
          status: Math.random() > 0.5 ? "ACTIVE" : "IDLE",
        })),
        radio: {
          channel: "R1",
          status: Math.random() > 0.5 ? "ON" : "OFF",
        },
      }));

      socket.emit("devicePackets", packets);
    }, 1000);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      clearInterval(interval);
    });
  });
};
