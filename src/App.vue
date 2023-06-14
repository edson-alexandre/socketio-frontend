<template>
  <div class="App">
    <form @submit.prevent="submitToken">
      <input type="text" placeholder="Enter Name" v-model="token.name" />
      <button type="submit">Submit</button>
    </form>
    <div class="box">
      <div class="messages">
        <div v-for="user in messages" :key="user.id">{{ user.name }}: {{ user.message }}</div>
      </div>
      <div class="messages"></div>
      <form class="input-div" @submit.prevent="submitMessage">
        <input type="text" placeholder="Type in text" v-model="inputMessageText" />
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import SocketioService from './services/socketio.service.js';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      token: {
        id: '',
        name: '',
        iat: 123,
      },
      inputMessageText: '',
      messages: [],
    };
  },
  methods: {
    submitToken() {
      console.log(this.token);
      SocketioService.setupSocketConnection(this.token);
      SocketioService.subscribeToMessages((err, data) => {
        console.log(data);
        this.messages.push(data);
      });
    },
    submitMessage() {
      const CHAT_ROOM = 'myRandomChatRoomId';
      const message = this.inputMessageText;
      SocketioService.sendMessage({ message, roomName: CHAT_ROOM }, cb => {
        console.log(cb);
        this.messages.push({
          message,
          ...this.token,
        });
        this.inputMessageText = '';
      });
    },
  },
  // created() {
  //   SocketioService.setupSocketConnection();
  // },

  beforeUnmount() {
    SocketioService.disconnect();
  },
};
</script>

<style>
.App {
  padding: 1rem;
}

.box {
  width: fit-content;
  height: 400px;
  border: solid 1px #000;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.messages {
  flex-grow: 1;
}

.input-div {
  display: flex;
  width: 100%;
}
</style>
