<script setup lang="ts">
import { ref } from "vue";
import { useChatStore } from "../store/chatStore";
import { generateAvatarUrl } from "../utils/avatar";

const chatStore = useChatStore();
const username = ref("");

const handleSubmit = () => {
  if (username.value.trim()) {
    chatStore.setUser({
      username: username.value.trim(),
      avatar: generateAvatarUrl(username.value.trim()),
    });
  }
};
</script>

<template>
  <div class="outer-shell login-shell">
    <div class="login-container">
      <span class="login-header">Bienvenido</span>
      <h2>Ingresar al Chat</h2>
      <form @submit.prevent="handleSubmit" class="login-form">
        <input
          type="text"
          placeholder="Tu nombre..."
          v-model="username"
          required
          autofocus
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  </div>
</template>
