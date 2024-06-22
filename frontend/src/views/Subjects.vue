<template>
  <div class="info">
    <h1>Your subjects</h1>
    <p>Here you can add, edit and delete your subjects.</p>
  </div>
  <div class="subjects">
    <SubjectsComponent />
  </div>
</template>

<script>
import SubjectsComponent from "../components/SubjectsComponent.vue";
export default {
  name: "SubjectsPage",
  components: {
    SubjectsComponent,
  },
};
</script>

<style>
.info {
  text-align: center;
  margin-top: 50px;
}
</style>
