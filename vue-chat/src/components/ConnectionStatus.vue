<script setup lang="ts">
import { useChatStore } from '../store/chatStore';

const chatStore = useChatStore();
</script>

<template>
  <div class="status-bar">
    <div class="status-indicator">
      Status: {{ chatStore.connected ? '🟢 Conectado' : '🔴 Desconectado' }}
    </div>
    <div v-if="chatStore.user" class="user-info">
      <img :src="chatStore.user.avatar" alt="avatar" class="avatar-small" />
      <span class="username">{{ chatStore.user.username }}</span>
      <button @click="chatStore.logout" class="logout-btn" title="Cerrar sesión">Salir</button>
    </div>
  </div>
</template>
