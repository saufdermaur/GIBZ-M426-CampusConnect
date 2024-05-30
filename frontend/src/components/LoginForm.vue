<template>
  <div>
    <form @submit.prevent="login">
      <input v-model="email" type="text" placeholder="email">
      <input v-model="password" type="password" placeholder="password">
      <br>
      <input type="submit" value="log in">
    </form>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from "axios";

const BASE_URL = "http://localhost:6790";

const apiClient = axios.create({
baseURL: BASE_URL
});

export default defineComponent({
name: 'LoginForm',
data() {
  return {
    email: '',
    password: ''
  };
},
methods: {
  async login() {
    const { email, password } = this;
    try {
      const { data: { token } } = await apiClient.post("api/account/login", {
        email: email,
        password: password
      });
      // Save token in local storage
      localStorage.setItem('jwt', token);
      // Redirect to another route after successful login
      this.$router.push('/dashboard');
    } catch (error) {
      console.log(error.config);
      throw error;
    }
  }
}
});
</script>
