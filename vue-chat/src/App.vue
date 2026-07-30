<script setup lang="ts">
import { useChat } from "./composables/useChat";
import { useChatStore } from "./store/chatStore";

import Login from "./components/Login.vue";
import ConnectionStatus from "./components/ConnectionStatus.vue";
import MessageList from "./components/MessageList.vue";
import MessageInput from "./components/MessageInput.vue";

const chatStore = useChatStore();

useChat();
</script>

<template>
  <div class="ambient-orb orb-1"></div>
  <div class="ambient-orb orb-2"></div>

  <Login v-if="!chatStore.user" />

  <div v-else class="outer-shell">
    <div class="chat-app">
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
  </div>
</template>
