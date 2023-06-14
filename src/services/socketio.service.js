import { io } from 'socket.io-client';

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    const uuid = self.crypto.randomUUID();

    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT, {
      auth: {
        token: uuid,
      },
    });
    this.socket.on('my broadcast', data => {
      console.log(data);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  sendMessage() {
    this.socket.emit('my message', 'Hello there from Vue.');
  }
}

export default new SocketioService();
