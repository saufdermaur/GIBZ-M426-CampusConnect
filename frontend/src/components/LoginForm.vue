<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
      <v-sheet width="400" class="mx-auto">
          <v-form fast-fail @submit.prevent="login">
              <v-text-field v-model="email" label="E-Mail"></v-text-field>

              <v-text-field v-model="password" label="password"></v-text-field>
              <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

              <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>

          </v-form>
          <div class="mt-2">
              <p class="text-body-2">Don't have an account? <a href="#">Sign Up</a></p>
          </div>
      </v-sheet>
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
      this.$router.push('/');
    } catch (error) {
      console.log(error.config);
      throw error;
    }
  }
}
});
</script>
