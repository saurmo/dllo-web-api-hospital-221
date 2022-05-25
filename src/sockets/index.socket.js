
class SocketHospital {

    constructor(io) {
        this.io = io
        this.loadSocket()
        this.users=[]
        this.messages=[]
    }

    loadSocket() {
        this.io.on('connection', (socket) => {
            console.log('a user connected');
            this.newUser(socket)
            this.onMessages(socket)
        });
    }

    newUser(socket) {
        socket.on("nuevo-usuario", (data) => {
            this.users.push(data)
            this.io.emit("usuarios-conectados", this.users )
        })
    }

    onMessages(socket) {
        socket.on("onMessage", (data) => {
            console.log(data);
            this.messages.push(data)
            this.io.emit("pushMessages", this.messages )
        })
    }


}

module.exports = { SocketHospital }