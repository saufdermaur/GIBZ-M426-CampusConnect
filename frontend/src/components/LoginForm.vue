<template>
  <v-contain>
    <v-row class="d-flex justify-center align-center" style="height: 200px;">
        <v-img :src="require('../assets/favicon.svg')" max-width="100">
          <template v-slot:placeholder>
            <v-row class="fill-height d-flex align-center justify-center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-row>
      <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <template v-if="isSignedIn">
          <v-card variant="tonal">
            <v-card-title>Hallo {{ accountInfo.FirstName }} {{ accountInfo.LastName }}!</v-card-title>
            <v-card-text>Deine Details:</v-card-text>
            <v-card-text>Vorname: {{ accountInfo.FirstName }}</v-card-text>
            <v-card-text>Nachname: {{ accountInfo.LastName }}</v-card-text>
            <v-card-text>E-Mail: {{ accountInfo.Email }}</v-card-text>
          </v-card>
          <v-btn @click="logout" color="primary" block>Abmelden</v-btn>
        </template>
        <template v-else>
          <v-form fast-fail @submit.prevent="login">
            <v-text-field v-model="email" label="E-Mail"></v-text-field>
            <v-text-field v-model="password" label="Passwort"></v-text-field>
            <a href="#" class="text-body-2 font-weight-regular">Passwort vergessen?</a>
            <v-btn type="submit" color="primary" block class="mt-2">Anmelden</v-btn>
          </v-form>
          <div class="mt-2">
            <p class="text-body-2">Kein Benutzerkonto? <a href="#">Registrieren</a></p>
          </div>
        </template>
      </v-col>
  </v-row>
  </v-contain>
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
      password: '',
      accountInfo: {},
    };
  },
  mounted() {
    if (this.isSignedIn) {
      this.fetchAccountInfo();
    }
  },
  computed: {
    isSignedIn() {
      return !!localStorage.getItem('jwt');
    }
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
        this.$router.push({ name: 'Home' });
        // Fetch account info after successful login
        await this.fetchAccountInfo();
      } catch (error) {
        console.log(error.config);
        throw error;
      }
    },
    async fetchAccountInfo() {
      try {
        const response = await apiClient.get("/api/account/account-info", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        this.accountInfo = response.data;
      } catch (error) {
        console.error("Error fetching account info:", error.response ? error.response.data : error.message);
      }
    },
    logout() {
      localStorage.removeItem('jwt');
      this.accountInfo = {};
      this.$router.push({ name: 'Home' });
    }
  }
});
</script>
