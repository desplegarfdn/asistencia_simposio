<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const toast = useToast();
const maestros = ref([]); // 🔹 Cambiado de encuestadores a maestros
const loading = ref(false);
const token = localStorage.getItem('access_token');
const search = ref('');

// 🔹 Función para obtener todos los maestros
const obtenerMaestros = async () => {
    loading.value = true;
    try {
        const response = await axios.get('https://asistenciasimposio-api.onrender.com/todos', {
            headers: { Authorization: `Bearer ${token}` }
        });

        maestros.value = response.data;
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Lista de maestros cargada.', life: 3000 });
    } catch (error) {
        console.error('Error al obtener maestros:', error.response?.data || error.message);
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron obtener los maestros.', life: 4000 });
    } finally {
        loading.value = false;
    }
};

// 🔹 Cargar los datos al montar el componente
onMounted(() => {
    obtenerMaestros();
});
</script>

<template>
    <div class="container">
        <Toast />

        <h1 class="titulo">Lista de Maestros</h1>

        <div class="tabla-container">
            <DataTable :value="maestros" :paginator="true" :rows="10" :loading="loading" filterDisplay="menu" :globalFilterFields="['nombre', 'apellido_p', 'numero_plaza']" v-model:globalFilter="search" scrollable scrollHeight="500px" class="tabla">
                <Column field="numero_plaza" header="Número de Plaza" sortable></Column>
                <Column field="nombre" header="Nombre" sortable></Column>
                <Column field="apellido_p" header="Apellido Paterno" sortable></Column>
                <Column field="apellido_m" header="Apellido Materno" sortable></Column>
                <Column field="genero" header="Género" sortable></Column>
            </DataTable>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 900px;
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

.tabla-container {
    overflow-x: auto;
    border-radius: 10px;
}

/* 🔹 Estilizamos la tabla */
.tabla {
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    min-width: 800px;
}

/* 🔹 Cabecera con colores de UNACH */
::v-deep(.p-datatable-thead) {
    background: #003366 !important;
    color: white !important;
}

/* 🔹 Hover en filas */
::v-deep(.p-datatable tbody tr:hover) {
    background-color: #f8f8f8 !important;
}
</style>
