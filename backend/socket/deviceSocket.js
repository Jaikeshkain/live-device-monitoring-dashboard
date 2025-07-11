const io=(io)=>{
  io.on("connection", (socket) => {
    console.log("New client connected");

    

    //disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

module.exports = io;