
class SocketHospital {

    constructor(io) {
        this.io = io
        this.loadSocket()
        this.users=[]
    }

    loadSocket() {
        this.io.on('connection', (socket) => {
            console.log('a user connected');
            this.newUser(socket)
        });
    }

    newUser(socket) {
        socket.on("nuevo-usuario", (data) => {
            this.users.push(data)
            this.io.emit("usuarios-conectados", this.users )
        })
    }


}

module.exports = { SocketHospital }