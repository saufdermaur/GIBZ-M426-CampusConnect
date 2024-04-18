<script setup>
import { ref, onMounted } from 'vue';
import { fetchMessage } from '@/services/api';

const message = ref('Loading...');

onMounted(async () => {
  try {
    message.value = await fetchMessage();
  } catch (error) {
    message.value = 'Failed to fetch data, error in BackendTest.vue';
  }
});
</script>

<template>
  <div>
    <h1>API Response</h1>
    <p>{{ message }}</p>
  </div>
</template>
