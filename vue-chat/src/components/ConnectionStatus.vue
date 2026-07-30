<script setup lang="ts">
import { useChatStore } from "../store/chatStore";
import Avatar from "./Avatar.vue";

const chatStore = useChatStore();
</script>

<template>
  <div class="status-bar">
    <div class="status-indicator">
      Status: {{ chatStore.connected ? "🟢 Conectado" : "🔴 Desconectado" }}
    </div>
    <div v-if="chatStore.user" class="user-info">
      <Avatar :src="chatStore.user.avatar" alt="avatar" size="sm" />
      <span class="username">{{ chatStore.user.username }}</span>
      <button @click="chatStore.logout()" class="logout-btn" title="Cerrar sesión">
        Salir
      </button>
    </div>
  </div>
</template>
