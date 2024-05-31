<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { ScheduleXCalendar } from '@schedule-x/vue';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import {
  createCalendar,
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import axios from 'axios';

const BASE_URL = "http://localhost:6790";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

const eventsServicePlugin = createEventsServicePlugin();

const calendarApp = createCalendar({
  plugins: [eventsServicePlugin],
  locale: 'de-CH',
  firstDayOfWeek: 1,
  dayBoundaries: {
    start: '07:00',
    end: '21:00',
  },
  selectedDate: new Date().toISOString().split('T')[0],
  views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
  defaultView: viewWeek.name,
  events: [],
});

async function fetchCalendarEvents() {
  try {
    const token = localStorage.getItem('jwt');
    const response = await apiClient.get("/api/exam/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const events = response.data.map(event => ({
      title: event.ExamTitle,
      start: new Date(event.ExamDate).toISOString(),
      end: new Date(event.ExamDate).toISOString(),
      id: event.ExamID
    }));
    eventsServicePlugin.set(events);
  } catch (error) {
    console.error("Error fetching events:", error.response ? error.response.data : error.message);
  }
}

onMounted(fetchCalendarEvents);
</script>

<style>
.sx-vue-calendar-wrapper {
  width: 100%;
  height: 800px;
  max-height: 90vh;
}
</style>
