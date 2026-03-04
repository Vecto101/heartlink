require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
cors:{origin:"*"}
});

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/heartlink")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/",authRoutes);

io.on("connection",(socket)=>{

console.log("User connected");

socket.on("send-location",(data)=>{

io.emit("receive-location",data);

});

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});