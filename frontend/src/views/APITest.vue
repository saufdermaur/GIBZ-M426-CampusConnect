<template>
    <div class="apiTest">
        <BackendTest />
    </div>
</template>

<script>
import BackendTest from '../components/BackendTest.vue';
export default {
    name: 'APITestPage',
    components: {
        BackendTest
}
}
</script>

<style scoped>
.apiTest {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>