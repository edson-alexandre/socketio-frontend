<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <button @click="sendMessage()">Emitir Mensagem</button>
  </div>
</template>

<script>
import SocketioService from './services/socketio.service.js';

export default {
  name: 'App',
  components: {},
  methods: {
    sendMessage() {
      SocketioService.sendMessage();
    },
  },
  created() {
    SocketioService.setupSocketConnection();
  },

  beforeUnmount() {
    SocketioService.disconnect();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
