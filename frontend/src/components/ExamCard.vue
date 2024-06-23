<template>
    <v-card variant="tonal" class="card">
      <v-btn color="grey-darken-4" @click="createExam">Prüfung erstellen</v-btn>
  
      <v-data-table
        :headers="headers"
        :items="exams"
        item-key="ExamID"
        :sort-by="[{ key: 'ExamTitle', order: 'asc' }]"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:[`item.ExamDate`]="{ item }">
          {{ new Date(item.ExamDate).toLocaleDateString() }}
        </template>
        <template v-slot:[`item.ExamTime`]="{ item }">
          {{ new Date(item.ExamDate).toLocaleTimeString() }} 
        </template>
      </v-data-table>
  
      <!-- Dialog for editing item -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field v-model="editedItem.ExamTitle" label="Titel"></v-text-field>
              </v-row>
              <v-row>
                <v-text-field v-model="editedItem.Description" label="Beschreibung"></v-text-field>
              </v-row>
              <v-row>
                <v-date-picker v-model="editedItem.ExamDate" label="Datum"></v-date-picker>
              </v-row>
              <v-row>
                <v-time-picker 
                format="24"         
                :allowed-hours="allowedHours"
                :allowed-minutes="allowedMinutes"
                min="07:30" 
                max="21:00"
                v-model="editedItem.ExamTime" 
                label="Uhrzeit">
                </v-time-picker>
              </v-row>
              <v-row>
                <v-text-field v-model="editedItem.Grade" label="Note"></v-text-field>
              </v-row>
              <v-row>
                <v-text-field v-model="editedItem.Weight" label="Gewicht"></v-text-field>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Abbrechen</v-btn>
            <v-btn color="blue darken-1" text @click="save">Speichern</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Dialog for deleting item -->
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="headline">Dieses Element wirklich löschen?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Abbrechen</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Löschen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Dialog for creating exam -->
      <v-dialog v-model="newExamDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Neue Prüfung</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field v-model="defaultItem.ExamTitle" label="Titel"></v-text-field>
              <v-text-field v-model="defaultItem.Description" label="Beschreibung"></v-text-field>
              <v-date-picker v-model="defaultItem.ExamDate" label="Datum"></v-date-picker>
              <v-time-picker 
                format="24"         
                :allowed-hours="allowedHours"
                :allowed-minutes="allowedMinutes"
                min="07:30" 
                max="21:00"
                v-model="editedItem.ExamTime" 
                label="Uhrzeit">
              </v-time-picker>              
              <v-text-field v-model="editedItem.Grade" label="Note"></v-text-field>
              <v-text-field v-model="editedItem.Weight" label="Gewicht"></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeCreateExam">Abbrechen</v-btn>
            <v-btn color="blue darken-1" text @click="saveNewExam">Speichern</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </template>
  
  <script>
  const BASE_URL = "http://localhost:6790";
  
  import axios from 'axios';
  import { VTimePicker } from 'vuetify/labs/VTimePicker'
  
  export default {
    components: {
      VTimePicker,
    },
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        newExamDialog: false,
        headers: [
          { title: 'Titel', key: 'ExamTitle' },
          { title: 'Beschreibung', key: 'Description' },
          { title: 'Datum', key: 'ExamDate' },
          { title: 'Uhrzeit', key: 'ExamTime' },
          { title: 'Note', key: 'Grade' },
          { title: 'Gewicht', key: 'Weight' },
          { title: 'Aktionen', key: 'actions', sortable: false },
        ],
        exams: [],
        editedIndex: -1,
        editedItem: {
          ExamID: '',
          ExamTitle: '',
          Description: '',
          ExamDate: new Date(),
          ExamTime: '',
          Grade: 0,
          Weight: 0,
        },
        defaultItem: {
          ExamID: '',
          ExamTitle: '',
          Description: '',
          ExamDate: new Date(),
          ExamTime: '',
          Grade: 0,
          Weight: 0,
        },
        loading: true,
      };
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Exam' : 'Edit Exam';
      },
    },
    watch: {
      dialog(val) {
        val || this.close();
      },
      dialogDelete(val) {
        val || this.closeDelete();
      },
      newExamDialog(val) {
        val || this.closeCreateExam();
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios.get(`${BASE_URL}/api/exam/getAll`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
          .then(response => {
            this.exams = response.data;
            this.loading = false;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      },
  
      createExam() {
        this.newExamDialog = true;
      },
  
      editItem(item) {
        this.editedIndex = this.exams.indexOf(item);
        this.editedItem = { ...item };
        this.dialog = true;
      },
      deleteItem(item) {
        this.editedIndex = this.exams.indexOf(item);
        this.editedItem = { ...item };
        this.dialogDelete = true;
      },
      deleteItemConfirm() {
        axios.delete(`${BASE_URL}/api/exam/${this.editedItem.ExamID}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
          .then(() => {
            this.exams.splice(this.editedIndex, 1);
            this.closeDelete();
          })
          .catch(error => {
            console.error('Error deleting exam:', error);
          });
      },
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = { ...this.defaultItem };
          this.editedIndex = -1;
        });
      },
      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = { ...this.defaultItem };
          this.editedIndex = -1;
        });
      },
      save() {
        const { ExamID, ExamTitle, Description, ExamDate, ExamTime, Grade, Weight } = this.editedItem;
        
        // Concatenate date and time
        const combinedDateTime = new Date(`${ExamDate}T${ExamTime}`).toISOString();

        if (this.editedIndex > -1) {
            axios.put(`${BASE_URL}/api/exam/${ExamID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            ExamTitle,
            Description,
            ExamDateTime: combinedDateTime, // Use combined datetime
            Grade,
            Weight,
            })
            .then(() => {
                this.exams.splice(this.editedIndex, 1, { ...this.editedItem });
                this.close();
            })
            .catch(error => {
                console.error('Error updating exam:', error);
            });
        } else {
            axios.post(`${BASE_URL}/api/exam/create-exam`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            ExamTitle,
            Description,
            ExamDateTime: combinedDateTime, // Use combined datetime
            Grade,
            Weight,
            })
            .then(response => {
                this.exams.push(response.data);
                this.close();
            })
            .catch(error => {
                console.error('Error creating exam:', error);
            });
        }
        },

      closeCreateExam() {
        this.newExamDialog = false;
        this.$nextTick(() => {
          this.defaultItem = { ...this.defaultItem };
        });
      },
      saveNewExam() {
        const { ExamTitle, Description, ExamDate, Grade, Weight } = this.defaultItem;
        axios.post(`${BASE_URL}/api/exam/create-exam`, {             
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }, 
            ExamTitle, Description, ExamDate, Grade, Weight 
        })
          .then(response => {
            this.exams.push(response.data);
            this.closeCreateExam();
            this.fetchData();
          })
          .catch(error => {
            console.error('Error creating exam:', error);
          });
      },
    },
  };
  </script>
  
  <style>
  .mr-2 {
    margin-right: 8px;
  }
  </style>
  