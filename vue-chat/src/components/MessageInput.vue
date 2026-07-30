<script setup lang="ts">
import { ref } from "vue";
import { socketService } from "../services/socket";
import { useChatStore } from "../store/chatStore";
import { createMessage } from "../utils/messageFactory";

const chatStore = useChatStore();
const text = ref("");

const handleSend = () => {
  if (text.value.trim() && chatStore.user) {
    socketService.sendMessage(createMessage(text.value, chatStore.user));
    text.value = "";
  }
};
</script>

<template>
  <form class="message-input-form" @submit.prevent="handleSend">
    <input
      type="text"
      placeholder="escribir mensaje..."
      v-model="text"
      autofocus
    />
    <button type="submit" :disabled="!text.trim()">Enviar</button>
  </form>
</template>
