import { mount } from '@vue/test-utils';
import ScheduleXCalendar from '../../src/components/CalendarComponent.vue'; 
import axios from 'axios';
import { createEventsServicePlugin } from '@schedule-x/events-service';

jest.mock('axios');

describe('ScheduleXCalendar.vue', () => {
  let wrapper;

  beforeEach(() => {
    jest.mock('axios', () => ({
      get: jest.fn(() => Promise.resolve({
        data: [
          { ExamTitle: 'Math Exam', ExamDate: '2024-07-01T00:00:00Z', ExamID: 1 },
          { ExamTitle: 'Science Exam', ExamDate: '2024-07-02T00:00:00Z', ExamID: 2 }
        ]
      }))
    }));

    wrapper = mount(ScheduleXCalendar, {
      global: {
        plugins: [createEventsServicePlugin]
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('fetches calendar events on mount', async () => {
    // Wait for the API call to complete
    await flushPromises();

    const eventsServicePlugin = wrapper.vm.calendarApp.plugins[0];
    const events = eventsServicePlugin.get();
    
    expect(events).toHaveLength(2);
    expect(events[0].title).toBe('Math Exam');
    expect(events[1].title).toBe('Science Exam');
  });


});

// Utility function to wait for all promises to resolve
function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}
