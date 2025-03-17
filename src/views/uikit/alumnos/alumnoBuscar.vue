<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import logoUnach from '@/assets/logo2.png'; // Logo UNACH

const toast = useToast();
const matricula = ref('');
const alumno = ref(null);
const loading = ref(false);
const token = localStorage.getItem('access_token');

// 🔹 Función para buscar alumno por matrícula
const buscarAlumno = async () => {
    if (!matricula.value.trim()) {
        toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ingresa una matrícula.', life: 3000 });
        return;
    }

    loading.value = true;
    alumno.value = null;

    try {
        const response = await axios.get(`https://asistenciasimposio-api.onrender.com/alumnos/busqueda/${matricula.value.trim()}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        alumno.value = response.data;
        toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `Alumno encontrado: ${alumno.value.nombre} ${alumno.value.apellido_p}`,
            life: 3000
        });
    } catch (error) {
        console.error('Error al buscar alumno:', error.response?.data || error.message);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Alumno no encontrado.', life: 3000 });
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="container">
        <Toast />
        <!-- Notificaciones PrimeVue -->

        <div class="header">
            <img :src="logoUnach" alt="Logo UNACH" class="logo" />
            <h1 class="titulo">Buscar Alumno</h1>
        </div>

        <div class="card">
            <div class="formulario">
                <label>Matrícula del Alumno:</label>
                <div class="search-container">
                    <input type="text" v-model="matricula" placeholder="Ingresa la matrícula" />
                    <button @click="buscarAlumno" :disabled="loading">
                        {{ loading ? 'Buscando...' : 'Buscar' }}
                    </button>
                </div>
            </div>

            <!-- Mostrar datos del alumno si se encuentra -->
            <div v-if="alumno" class="datos-alumno">
                <h3>Datos del Alumno</h3>
                <table>
                    <tr>
                        <td><strong>Nombre:</strong></td>
                        <td>{{ alumno.nombre }} {{ alumno.apellido_p }} {{ alumno.apellido_m }}</td>
                    </tr>
                    <tr>
                        <td><strong>Carrera:</strong></td>
                        <td>{{ alumno.carrera }}</td>
                    </tr>
                    <tr>
                        <td><strong>Semestre:</strong></td>
                        <td>{{ alumno.semestre }}</td>
                    </tr>
                    <tr>
                        <td><strong>Grupo:</strong></td>
                        <td>{{ alumno.grupo }}</td>
                    </tr>
                    <tr>
                        <td><strong>Género:</strong></td>
                        <td>{{ alumno.genero }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}

.header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.logo {
    width: 60px;
    height: auto;
}

.titulo {
    font-size: 22px;
    font-weight: bold;
    color: #003366; /* Azul UNACH */
}

.card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* 🔹 Estilos para búsqueda */
.search-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 10px;
}

.search-container input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    box-sizing: border-box;
}

.search-container button {
    background-color: #c9a227; /* Dorado UNACH */
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    width: 100%;
}

.search-container button:hover {
    background-color: #b8961e; /* Dorado más oscuro */
}

/* 🔹 Datos del alumno */
.datos-alumno {
    margin-top: 15px;
    padding: 12px;
    background: #f8f8f8;
    border-radius: 8px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
}

/* 🔹 Botón más pequeño */
button.eliminar {
    background-color: #d9534f; /* Rojo */
    padding: 10px;
    font-size: 14px;
    width: 100%;
}

button.eliminar:hover {
    background-color: #c9302c;
}
</style>
