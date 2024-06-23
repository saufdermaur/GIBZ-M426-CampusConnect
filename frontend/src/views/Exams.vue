<template>
    <v-container>
        <v-row>
            <v-col>
                <ExamDataTable class="data-table"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ExamDataTable from '../components/ExamCard.vue'
export default {
    name: 'ExamPage',
    components: {
        ExamDataTable,
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