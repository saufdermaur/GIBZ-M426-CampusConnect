<template>
    <div class="calendar">
        <CalendarComponent />
    </div>
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

<style scoped>
.about {
    text-align: center;
    margin-top: 50px;
}
</style>