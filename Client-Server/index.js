const express = require("express") // we get the express module
const app = express() 
const http = require("http") // http is used to create a listener server
const server = http.createServer(app) // we put the app itselft onto the http
const {Server} = require("socket.io")

const io = new Server(server)

// this code set the server socket and return as callback all the sockets that are connected to it
io.on("connection", socket =>{
    console.log("a user connected");
    console.log(socket.id)
    socket.on("chat message", (msg)=>{
        console.log(msg);
        if(msg == "te quiero"){
            io.emit("chat message", "yo tambien")
        }
        else{
            io.emit("chat message", "no jodas")
        }
        
    })
    socket.on("disconect", ()=> console.log("user disconected")
    )
})

app.get('/', (req, res)=>{ // we are getting the root and sending as response the html file
    res.sendFile(__dirname + "/index.html")
})

server.listen(3000, ()=>{  // we open a server in port 3000 and listen it
    console.log("listening on server port 3000");
})