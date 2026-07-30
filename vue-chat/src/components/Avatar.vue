<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
  size?: "sm" | "md";
}>();
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :class="size === 'sm' ? 'avatar-small' : 'message-avatar'"
  />
</template>
