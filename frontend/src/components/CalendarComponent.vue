<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>

<script setup>
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'

const calendarApp = createCalendar({
  locale: 'de-CH',
  firstDayOfWeek: 1,
  dayBoundaries: {
    start: '07:00',
    end: '21:00',
  },
  selectedDate: new Date().toISOString().split('T')[0],
  views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
  defaultView: viewWeek.name,
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: '2023-12-19',
      end: '2023-12-19',
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2023-12-20 12:00',
      end: '2023-12-20 13:00',
    },
  ],
})
</script>

<style>
.sx-vue-calendar-wrapper {
  width: 100%;
  height: 800px;
  max-height: 90vh;
}
</style>
