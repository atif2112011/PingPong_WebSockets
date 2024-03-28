let readyPlayerCount=0;
function listen(io){
  const pongNameSpace=io.of('/pong')


  pongNameSpace.on('connection',(socket)=>{
    console.log('A user connected',socket.id)
    let room='room'+ Math.floor(readyPlayerCount/2)

    socket.on('ready',()=>{

      

      socket.join(room)
        console.log(`Player Ready.. ${socket.id} and room joined :${room}`)

        readyPlayerCount++;

        if(readyPlayerCount%2===0){
          pongNameSpace.in(room).emit('startGame',socket.id)
          console.log('Game Started')
        }
    })


    socket.on('paddleMove',(paddleData)=>{
      socket.to(room).emit('paddleMove',paddleData)
    })

    socket.on('ballMove',(ballData)=>{
      socket.to(room).emit('ballMove',ballData)
    })
    
    socket.on('disconnect',(reason)=>{
        console.log(`Client ${socket.id} disconnected`)

        socket.leave(room)
    })
})
}

module.exports={listen}