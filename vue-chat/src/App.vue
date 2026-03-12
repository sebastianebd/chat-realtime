<script setup lang="ts">
import { onUnmounted, watch } from "vue";
import { socketService } from "./services/socket";
import { useChatStore, type ChatMessage } from "./store/chatStore";

import Login from "./components/Login.vue";
import ConnectionStatus from "./components/ConnectionStatus.vue";
import MessageList from "./components/MessageList.vue";
import MessageInput from "./components/MessageInput.vue";

const chatStore = useChatStore();

const onConnect = () => chatStore.setConnected(true);
const onDisconnect = () => chatStore.setConnected(false);
const onMessage = (msg: ChatMessage) => chatStore.addMessage(msg);

const initSocket = () => {
  socketService.connect();
  const socket = socketService.socket;
  if (!socket) return;

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.on("message", onMessage);
};

const cleanupSocket = () => {
  const socket = socketService.socket;
  if (socket) {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
    socket.off("message", onMessage);
  }
  socketService.disconnect();
};

watch(
  () => chatStore.user,
  (newUser, oldUser) => {
    if (newUser && !oldUser) {
      initSocket();
    } else if (!newUser && oldUser) {
      cleanupSocket();
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  cleanupSocket();
});
</script>

<template>
  <Login v-if="!chatStore.user" />

  <div v-else class="chat-app">
    <div class="chat-container">
      <header class="chat-header">
        <h1>Chat Realtime Vue 3</h1>
        <ConnectionStatus />
      </header>

      <main class="chat-main">
        <MessageList />
      </main>

      <footer class="chat-footer">
        <MessageInput />
      </footer>
    </div>
  </div>
</template>
