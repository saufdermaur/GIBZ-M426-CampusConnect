<template>
    <v-container>
        <v-row>
            <v-col>
                <ModuleDataTable class="data-table"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ModuleDataTable from '../components/ModuleCard.vue'
export default {
    name: 'ModulePage',
    components: {
        ModuleDataTable,
}
}
</script>

<style scoped>
.data-table {
    width: 100%;
    height: 80vh;
    padding: 5%;
}
</style>