<template>
    <v-row justify="center" align="center" style="height: 100vh;">
      <v-col cols="12" sm="8" >
        <CalendarComponent />
      </v-col>
    </v-row>
  </template>
  
  <script>
  import CalendarComponent from '../components/CalendarComponent.vue';
  
  export default {
    name: 'CalendarPage',
    components: {
      CalendarComponent
    }
  }
  </script> 