<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const toast = useToast();
const alumnos = ref([]);
const loading = ref(false);
const token = localStorage.getItem('access_token');
const search = ref('');

// 🔹 Función para obtener la lista de alumnos
const obtenerAlumnos = async () => {
    loading.value = true;
    try {
        const response = await axios.get('http://127.0.0.1:8000/alumnos/todos', {
            headers: { Authorization: `Bearer ${token}` }
        });

        alumnos.value = response.data;
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Lista de alumnos cargada correctamente.', life: 3000 });
    } catch (error) {
        console.error('Error al obtener alumnos:', error.response?.data || error.message);
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los alumnos.', life: 4000 });
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    obtenerAlumnos();
});
</script>

<template>
    <div class="container">
        <Toast />

        <h1 class="titulo">Lista de Alumnos</h1>

        <div class="tabla-container">
            <DataTable :value="alumnos" :paginator="true" :rows="15" :loading="loading" filterDisplay="menu" :globalFilterFields="['nombre', 'matricula', 'carrera']" v-model:globalFilter="search" scrollable scrollHeight="600px" class="tabla">
                <Column field="matricula" header="Matrícula" sortable></Column>
                <Column field="nombre" header="Nombre" sortable></Column>
                <Column field="apellido_p" header="Apellido Paterno" sortable></Column>
                <Column field="apellido_m" header="Apellido Materno" sortable></Column>
                <Column field="carrera" header="Carrera" sortable></Column>
                <Column field="semestre" header="Semestre" sortable></Column>
                <Column field="grupo" header="Grupo" sortable></Column>
                <Column field="genero" header="Género" sortable></Column>
            </DataTable>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 1000px;
    margin: auto;
    padding: 20px;
}

.titulo {
    font-size: 24px;
    font-weight: bold;
    color: #003366;
    text-align: center;
    margin-bottom: 15px;
}

.search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
}

.input-busqueda {
    width: 100%;
    max-width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.tabla-container {
    overflow-x: auto; /* Scroll horizontal */
    border-radius: 10px;
}

.tabla {
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    font-size: 16px; /* Aumentamos la fuente de la tabla */
    min-width: 800px; /* Evita que las columnas se compacten demasiado */
}

::v-deep(.p-datatable-thead) {
    background: #003366 !important; /* Azul UNACH */
    color: white !important;
}

::v-deep(.p-datatable tbody tr:hover) {
    background-color: #f8f8f8 !important;
}
</style>
