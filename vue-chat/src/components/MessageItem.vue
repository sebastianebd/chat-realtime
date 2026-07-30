<script setup lang="ts">
import type { ChatMessage } from "../types/chat";
import { formatTime } from "../utils/formatTime";
import Avatar from "./Avatar.vue";

defineProps<{
  message: ChatMessage;
  isOwn: boolean;
}>();
</script>

<template>
  <div
    :class="['message-item', isOwn ? 'own-message' : 'other-message']"
  >
    <Avatar
      v-if="!isOwn"
      :src="message.avatar"
      :alt="message.sender"
    />
    <div class="message-bubble">
      <div v-if="!isOwn" class="message-sender">{{ message.sender }}</div>
      <div class="message-text">{{ message.text }}</div>
      <div class="message-time">{{ formatTime(message.timestamp) }}</div>
    </div>
  </div>
</template>
