<template>
    <v-container>
      <v-row class="d-flex justify-center align-center" style="height: 200px;">
        <v-img :src="require('../assets/favicon.svg')" max-width="100">
          <template v-slot:placeholder>
            <v-row class="fill-height d-flex align-center justify-center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-row>
      
      <template v-if="isSignedIn">
        <v-row>
          <v-col>
            <v-card variant="tonal" class="account-card">
              <v-card-title>Hallo {{ accountInfo.FirstName }} {{ accountInfo.LastName }}!</v-card-title>
              <v-card-text>Willkommen auf deinem Dashboard. Hier findest du alle wichtigen Informationen auf einen Blick.</v-card-text>
            </v-card>
          </v-col>
        </v-row>
  
        <v-row>
          <v-col>
            <v-card variant="tonal" class="grade-card">
              <v-card-title>Dein Notendurchschnitt</v-card-title>
              <v-card-text>{{ average }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
  
        <v-row>
          <v-col>
            <v-card variant="tonal" class="exam-card" v-for="exam in exams" :key="exam.ExamID">
              <v-card-title>Prüfung nächste Woche</v-card-title>
              <v-card-text>Name: {{ exam.ExamTitle }}</v-card-text>
              <v-card-text>Datum: {{ exam.ExamDate }}</v-card-text>
              <v-card-text>Gewichtung: {{ exam.Weight }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
  
      <template v-else>
        <v-row>
          <v-col>
            <v-card variant="tonal" class="account-card">
              <v-card-title>Willkommen auf deinem Dashboard!</v-card-title>
              <v-card-text>Bitte melde dich an, um alle Funktionen nutzen zu können.</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
            <v-btn @click="login" color="primary" block>Anmelden</v-btn>
        </v-row>
      </template>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  const BASE_URL = "http://localhost:6790";
  
  export default {
    name: 'HomePage',
    data() {
      return {
        average: null,
        exams: [],
        accountInfo: {},
      };
    },
    computed: {
      isSignedIn() {
        return !!localStorage.getItem('jwt');
      },
    },
    mounted() {
      if (this.isSignedIn) {
        this.fetchAccountInfo();
        this.fetchGrade();
        this.fetchUpcomingExams();
      }
    },
    methods: {
      async fetchGrade() {
        try {
          const response = await axios.get(`${BASE_URL}/api/exam/getAverageGrades`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          });
          this.average = response.data ? response.data.averageGrade : 0;
        } catch (error) {
          console.error('Error fetching average grade:', error);
        }
      },
      async fetchUpcomingExams() {
        try {
          const response = await axios.get(`${BASE_URL}/api/exam/getExamsThisWeek`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          });
          this.exams = response.data ? response.data : [];
        } catch (error) {
          console.error("Error fetching exams:", error);
        }
      },
      async fetchAccountInfo() {
        try {
          const response = await axios.get(`${BASE_URL}/api/account/account-info`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          });
          this.accountInfo = response.data ? response.data : {};
        } catch (error) {
          console.error("Error fetching account info:", error);
        }
      },
      login() {
        this.$router.push({ name: 'Login' });
        }
    },
  };
  </script>
  
  <style scoped>
  .account-card, .grade-card, .exam-card {
    background-color: #f5f5f5;
    color: #000000;
    margin-bottom: 20px;
  }
  </style>
  