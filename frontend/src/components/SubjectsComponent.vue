<template>
  <div>
    <!-- Centered button container -->
    <div class="centered-container">
      <button @click="showModal = true">Add Subject</button>
    </div>

    <!-- Table section -->
    <table v-if="subjects.length" class="table-header">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Teacher</th>
          <th>Average</th>
          <th>Upcoming exams</th>
          <th>Calendar</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subject, index) in subjects" :key="subject.name">
          <td>{{ subject.name }}</td>
          <td>{{ subject.teacher }}</td>
          <td>{{ calculateAverage(subject.grades) }}</td>
          <td>{{ subject.exams }}</td>
          <td>
            <a href="#">{{ subject.calendar }}</a>
          </td>
          <td>
            <button @click="editSubject(index)" class="edit-button">
              Edit
            </button>
            <button @click="deleteSubject(index)" class="delete-button">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Spacer for new row -->
    <div class="spacer"></div>

    <!-- Modal for adding new subject -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="handleModalClose">&times;</span>
        <form @submit.prevent="handleSubmit">
          <div>
            <label for="name">Subject</label>
            <input
              v-model="newSubject.name"
              id="name"
              placeholder="Subject"
              required
            />
          </div>
          <div>
            <label for="teacher">Teacher</label>
            <input
              v-model="newSubject.teacher"
              id="teacher"
              placeholder="Teacher"
              required
            />
          </div>
          <div>
            <label for="exams">Upcoming exams</label>
            <input
              v-model="newSubject.exams"
              id="exams"
              type="number"
              placeholder="Upcoming exams"
              required
            />
          </div>
          <div>
            <label for="grades">Grades (comma separated)</label>
            <input
              v-model="newSubject.grades"
              id="grades"
              placeholder="Grades (comma separated)"
              required
            />
          </div>
          <button type="submit">
            {{ isEditing ? "Make Edit" : "Add Subject" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";

const BASE_URL = "http://localhost:6790";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

const subjects = reactive([]);

const showModal = ref(false);
const isEditing = ref(false); // Track if we are in edit mode

const newSubject = reactive({
  name: "",
  teacher: "",
  exams: 0,
  grades: "",
  calendar: "No events",
});

const calculateAverage = (grades) => {
  if (!grades.length) return 0.0;
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  const average = sum / grades.length;
  return average.toFixed(1); // Ensure the average is rounded to one decimal place
};

async function fetchCalendarEvents() {
  try {
    const token = localStorage.getItem("jwt");
    const response = await apiClient.get("/api/exam/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const events = response.data.map((event) => ({
      title: event.ExamTitle,
      date: new Date(event.ExamDate).toLocaleDateString(),
      id: event.ExamID,
    }));
    updateSubjectsCalendar(events);
  } catch (error) {
    console.error(
      "Error fetching events:",
      error.response ? error.response.data : error.message
    );
  }
}

function updateSubjectsCalendar(events) {
  subjects.forEach((subject) => {
    const subjectEvents = events.filter((event) =>
      event.title.includes(subject.name)
    );
    if (subjectEvents.length > 0) {
      subject.calendar = subjectEvents.map((event) => event.date).join(", ");
    } else {
      subject.calendar = "No events";
    }
  });
}

function addSubject() {
  const gradesArray = newSubject.grades.split(",").map(Number);
  subjects.push({
    ...newSubject,
    grades: gradesArray,
  });
  resetNewSubject();
}

function editSubject(index) {
  const subject = subjects[index];
  // Populate the modal form with the subject's data
  Object.assign(newSubject, subject);
  showModal.value = true;
  isEditing.value = true; // Set editing mode
}

function deleteSubject(index) {
  subjects.splice(index, 1);
}

function resetNewSubject() {
  newSubject.name = "";
  newSubject.teacher = "";
  newSubject.exams = 0;
  newSubject.grades = "";
  newSubject.calendar = "No events";
  showModal.value = false;
  isEditing.value = false; // Reset editing mode
}

function handleSubmit() {
  // Ensure grades is initialized and a string
  if (typeof newSubject.grades !== "string") {
    newSubject.grades = ""; // Initialize to empty string if undefined or not a string
  }

  if (isEditing.value) {
    // Update the existing subject in the array
    const gradesArray = newSubject.grades.split(",").map(Number);
    const editedSubject = {
      name: newSubject.name,
      teacher: newSubject.teacher,
      exams: newSubject.exams,
      grades: gradesArray,
      calendar: newSubject.calendar,
    };
    // Replace the old subject with the edited one
    subjects.splice(subjects.indexOf(newSubject), 1, editedSubject);
    resetNewSubject();
  } else {
    // Handle add logic here
    addSubject();
  }
}

function handleModalClose() {
  resetNewSubject();
}

onMounted(fetchCalendarEvents);
</script>

<style scoped>
/* Centered button container */
.centered-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px; /* Adjust spacing as needed */
}

/* Spacer for new row */
.spacer {
  margin-top: 20px; /* Adjust spacing to ensure new row is visually separate */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #5e5e5e;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #2272a7;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #1b5d8a;
}

.edit-button {
  background-color: #5cb85c;
}

.delete-button {
  background-color: #d9534f;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #3a3a3a;
}

.modal-content {
  background-color: #5e5e5e;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}
</style>
