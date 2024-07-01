<template>
  <div class="about">
    <div class="welcome-message">
      <h1>Willkommen bei unserer Schulnetz-Applikation</h1>
    </div>
    <div class="about-message">
      <p>
        Wir sind begeistert, Ihnen unsere innovative Plattform vorzustellen, die
        speziell entwickelt wurde, um das Schulleben einfacher und organisierter
        zu gestalten. Unsere Mission ist es, Schülern eine intuitive und
        effiziente Möglichkeit zu bieten, Noten und Prüfungen zu verwalten und
        stets den Überblick zu behalten.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  components: {
    // Add components here
  },
};
</script>

<style scoped>
.about {
  text-align: center;
  margin-top: 50px;
  color: #ffffff;
}

.welcome-message h1 {
  margin-bottom: 20px;
}

.about-message p {
  max-width: 600px;
  margin: 0 auto;
}
</style>
