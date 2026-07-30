<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { useChatStore } from "../store/chatStore";
import MessageItem from "./MessageItem.vue";
import EmptyState from "./EmptyState.vue";

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
</script>

<template>
  <div class="message-list-container">
    <EmptyState
      v-if="chatStore.messages.length === 0"
      message="No hay mensajes. Sé el primero en decir hola."
    />

    <template v-else>
      <MessageItem
        v-for="msg in chatStore.messages"
        :key="msg.id"
        :message="msg"
        :isOwn="msg.sender === chatStore.user?.username"
      />
    </template>

    <div ref="messagesEndRef"></div>
  </div>
</template>
