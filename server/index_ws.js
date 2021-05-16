
const http = require('http');
const server = http.createServer();

const io = require('socket.io')(server,{
    cors: {
        origin: '*',
        methods: '*'
    },
});

io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('new-message', data);
    });
});
server.listen(3000, () =>{
    console.info('server listening on port 3000');
})