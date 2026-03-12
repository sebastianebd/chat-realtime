<script setup lang="ts">
import { ref } from "vue";
import { useChatStore } from "../store/chatStore";

const chatStore = useChatStore();
const username = ref("");

const handleSubmit = () => {
  if (username.value.trim()) {
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username.value.trim())}&background=random`;
    chatStore.setUser({ username: username.value.trim(), avatar });
  }
};
</script>

<template>
  <div class="login-container">
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
</template>
