import socketIo from 'socket.io';

const configureSocket = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('message', (data) => {
            io.emit('message', data);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
};

export default configureSocket;
