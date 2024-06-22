<template>
    <v-container>
      <v-row>
        <v-col>
            <v-container>
              <v-row>
                <v-col>
                  <v-card variant="tonal" class="player-card" v-for="exam in exams" :key="exam.ExamID">
                    <v-card-title>Prüfungen die kommende Woche</v-card-title>
                    <v-card-text>Name: {{ exam.ExamTitle }}</v-card-text>
                    <v-card-text>Datum: {{ exam.ExamDate }}</v-card-text>
                    <v-card-text>Gewichtung: {{ exam.Weight }}</v-card-text>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card variant="tonal" class="player-card">
                    <v-card-title>Durchschnittsnote</v-card-title>
                    <v-card-text>{{ average }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
        </v-col>
      </v-row>
    </v-container>
  </template>
  

<script>
const BASE_URL = "http://localhost:6790"; 
export default {
    name: 'HomePage',
    data() {
        return {
            average: null,
            exams: [],
        };
    },
    mounted() {
        this.fetchesGrade();
        this.fetchUpcomingExams();
    },
    methods: {
        async fetchesGrade() {
            try {
                const response = await fetch(`${BASE_URL}/api/exam/getAverageGrades`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });
                const data = await response.json();
                if (data !== null) {
                    this.average = data.averageGrade;
                } else {
                    this.average = 0;
                }
            } catch (error) {
                console.error('Error fetching best player quota:', error);
            }
        },
        async fetchUpcomingExams(){
            try {
                const response = await fetch(`${BASE_URL}/api/exam/getExamsThisWeek`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });
                const data = await response.json();
                if (data !== null) {
                    this.exams = data;
                } else {
                    this.exams = [];
                }
            } catch (error) {
                console.error("Error fetching events:", error.response ? error.response.data : error.message);
            }
        },
    },
};

</script>

<style scoped>
.card {
  background-size: cover;
  background-position: center center;
  min-height: 300px; 
  position: relative;
}
.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  color: white; 
  height: 50vh;
  padding: 10px;
}
</style>