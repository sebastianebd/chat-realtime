<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { useChatStore } from "../store/chatStore";

const chatStore = useChatStore();
const messagesEndRef = ref<HTMLDivElement | null>(null);

watch(
  () => chatStore.messages.length,
  async () => {
    await nextTick();
    if (messagesEndRef.value) {
      messagesEndRef.value.scrollIntoView({ behavior: "smooth" });
    }
  },
  { immediate: true },
);

const isOwnMessage = (sender: string) => {
  return sender === chatStore.user?.username;
};

const formatTime = (ts: number) => {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<template>
  <div class="message-list-container">
    <div v-if="chatStore.messages.length === 0" class="empty-chat">
      No hay mensajes. Sé el primero en decir hola.
    </div>

    <template v-else>
      <div
        v-for="msg in chatStore.messages"
        :key="msg.id"
        :class="[
          'message-item',
          isOwnMessage(msg.sender) ? 'own-message' : 'other-message',
        ]"
      >
        <img
          v-if="!isOwnMessage(msg.sender)"
          :src="msg.avatar"
          :alt="msg.sender"
          class="message-avatar"
        />

        <div class="message-bubble">
          <div v-if="!isOwnMessage(msg.sender)" class="message-sender">
            {{ msg.sender }}
          </div>
          <div class="message-text">{{ msg.text }}</div>
          <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
        </div>
      </div>
    </template>

    <div ref="messagesEndRef"></div>
  </div>
</template>
