<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const nombreCompleto = ref('');
const totalAsistenciaCarrera = ref([]);
const asistenciaGenero = ref({ total_hombres: 0, total_mujeres: 0 });
const tiempoReal = ref(0);

// Obtener token JWT desde localStorage
const obtenerToken = () => localStorage.getItem('access_token');

// Función para obtener los datos del usuario
const obtenerUsuario = async () => {
    try {
        const token = obtenerToken();
        const response = await axios.get('http://127.0.0.1:8000/auth/user/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const { nombre, username } = response.data;
        nombreCompleto.value = `${nombre} ` || username;

        // Obtener los datos de asistencia
        await obtenerAsistenciaPorCarrera(token);
        await obtenerAsistenciaPorGenero(token);
        await obtenerTiempoReal(token);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        nombreCompleto.value = 'Usuario desconocido';
    }
};

// 📊 Obtener el total de asistentes por carrera
const obtenerAsistenciaPorCarrera = async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/asistencia/reporte/total-carrera', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        totalAsistenciaCarrera.value = response.data;
    } catch (error) {
        console.error('Error al obtener asistencia por carrera:', error);
        totalAsistenciaCarrera.value = [];
    }
};

// 📊 Obtener la asistencia por género (Hombres y Mujeres)
const obtenerAsistenciaPorGenero = async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/asistencia/reporte/genero', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        asistenciaGenero.value = response.data;
    } catch (error) {
        console.error('Error al obtener asistencia por género:', error);
        asistenciaGenero.value = { total_hombres: 0, total_mujeres: 0 };
    }
};

// 📊 Obtener asistentes en tiempo real
const obtenerTiempoReal = async (token) => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/asistencia/reporte/tiempo-real', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        tiempoReal.value = response.data.total_asistentes;
    } catch (error) {
        console.error('Error al obtener asistentes en tiempo real:', error);
        tiempoReal.value = 0;
    }
};

// Cargar datos al montar el componente
onMounted(() => {
    obtenerUsuario();
});
</script>

<template>
    <div class="dashboard">
        <!-- Mensaje de bienvenida -->
        <div class="welcome">
            <h1>¡Bienvenido/a, {{ nombreCompleto }}!</h1>
            <h2>Panel de Estadísticas de Asistencia - Simposio Internacional</h2>
        </div>

        <!-- Tarjetas con reportes -->
        <div class="grid">
            <!-- 🔹 Total asistentes por carrera -->
            <div class="card large-card">
                <h3>Asistencia por Carrera</h3>
                <ul v-if="totalAsistenciaCarrera.length">
                    <li v-for="carrera in totalAsistenciaCarrera" :key="carrera.carrera">
                        <strong>{{ carrera.carrera }}</strong
                        >: {{ carrera.total_asistentes }} asistentes
                    </li>
                </ul>
                <p v-else>Cargando datos...</p>
            </div>

            <!-- 🔹 Asistencia por género -->
            <div class="card large-card">
                <h3>Asistencia por Género</h3>
                <p><strong>Hombres:</strong> {{ asistenciaGenero.total_hombres }}</p>
                <p><strong>Mujeres:</strong> {{ asistenciaGenero.total_mujeres }}</p>
            </div>

            <!-- 🔹 Asistentes en tiempo real -->
            <div class="card large-card">
                <h3>Asistentes en Tiempo Real</h3>
                <p class="text-large">{{ tiempoReal }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 🔹 Contenedor principal */
.dashboard {
    padding: 2rem;
    text-align: center;
}

/* 🔹 Mensaje de bienvenida */
.welcome h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #003366; /* Azul UNACH */
}

.welcome h2 {
    font-size: 1.5rem;
    font-weight: 400;
    color: #c9a227; /* Dorado UNACH */
}

/* 🔹 Diseño de tarjetas */
.grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.large-card {
    padding: 1.5rem;
    border-radius: 10px;
    background: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    text-align: center;
    width: 350px;
}

h3 {
    color: #003366;
    margin-bottom: 1rem;
}

/* 🔹 Texto dentro de las tarjetas */
.text-large {
    font-size: 2.5rem;
    font-weight: bold;
    color: #c9a227;
}
</style>
