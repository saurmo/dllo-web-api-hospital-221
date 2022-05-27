
class SocketHospital {

    constructor(io) {
        this.io = io
        this.users=[]
        this.messages=[]
        this.loadSocket()
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
            this.io.emit("push-messages", this.messages )
        })
    }

    onMessages(socket) {
        socket.on("on-message", (data) => {
            console.log(data);
            this.messages.push(data)
            this.io.emit("push-messages", this.messages )
        })
    }


}

module.exports = { SocketHospital }