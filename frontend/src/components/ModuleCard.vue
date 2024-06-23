<template>
    <v-card>
      <!-- Button to create new module -->
      <v-btn color="primary" @click="createModule">Modul erstellen</v-btn>
      <v-spacer></v-spacer>
      <!-- Data table to display modules -->
      <v-data-table
        :headers="headers"
        :items="modules"
        item-key="ModuleID"
        :sort-by="[{ key: 'Name', order: 'asc' }]"
      >
        <!-- Actions column with edit and delete buttons -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
              <v-text-field v-model="editedItem.Name" label="Name"></v-text-field>
              <v-text-field v-model="editedItem.Description" label="Beschreibung"></v-text-field>
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
  
      <!-- Dialog for creating new module -->
      <v-dialog v-model="newModuleDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Neues Modul</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field v-model="defaultItem.Name" label="Name"></v-text-field>
              <v-text-field v-model="defaultItem.Description" label="Beschreibung"></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeCreateModule">Abbrechen</v-btn>
            <v-btn color="blue darken-1" text @click="saveNewModule">Speichern</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </template>
  <script>
  const BASE_URL = "http://localhost:6790";
  
  import axios from 'axios';
  
  export default {
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        newModuleDialog: false,
        headers: [
          { title: 'Name', key: 'Name' },
          { title: 'Beschreibung', key: 'Description' },
          { title: 'Aktionen', key: 'actions', sortable: false },
        ],
        modules: [],
        editedIndex: -1,
        editedItem: {
          ModuleID: '',
          Name: '',
          Description: '',
        },
        defaultItem: {
          ModuleID: '',
          Name: '',
          Description: '',
        },
        loading: true,
      };
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Neues Modul' : 'Modul bearbeiten';
      },
    },
    watch: {
      dialog(val) {
        val || this.close();
      },
      dialogDelete(val) {
        val || this.closeDelete();
      },
      newModuleDialog(val) {
        val || this.closeCreateModule();
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios.get(`${BASE_URL}/api/module/getAll`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          this.modules = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      },
  
      createModule() {
        this.newModuleDialog = true;
      },
  
      editItem(item) {
        this.editedIndex = this.modules.indexOf(item);
        this.editedItem = { ...item };
        this.dialog = true;
      },
  
      deleteItem(item) {
        this.editedIndex = this.modules.indexOf(item);
        this.editedItem = { ...item };
        this.dialogDelete = true;
      },
  
      deleteItemConfirm() {
        axios.delete(`${BASE_URL}/api/module/${this.editedItem.ModuleID}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          this.modules.splice(this.editedIndex, 1);
          this.closeDelete();
        })
        .catch(error => {
          console.error('Error deleting module:', error);
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
        const { ModuleID, Name, Description } = this.editedItem;
        const axiosMethod = this.editedIndex > -1 ? axios.put : axios.post;
        const url = this.editedIndex > -1 ? `${BASE_URL}/api/module/${ModuleID}` : `${BASE_URL}/api/module/create-module`;
  
        axiosMethod(url, { Name, Description }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          if (this.editedIndex > -1) {
            this.modules.splice(this.editedIndex, 1, { ...this.editedItem });
          } else {
            this.modules.push(response.data);
          }
          this.close();
        })
        .catch(error => {
          console.error('Error saving module:', error);
        });
      },
  
      closeCreateModule() {
        this.newModuleDialog = false;
        this.$nextTick(() => {
          this.defaultItem = { ...this.defaultItem };
        });
      },
  
      saveNewModule() {
        const { Name, Description } = this.defaultItem;
        axios.post(`${BASE_URL}/api/module/create-module`, { Name, Description }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          this.modules.push(response.data);
          this.closeCreateModule();
          this.fetchData();
        })
        .catch(error => {
          console.error('Error creating module:', error);
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
  