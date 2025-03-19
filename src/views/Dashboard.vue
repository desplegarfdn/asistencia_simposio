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
        const response = await axios.get('https://asistenciasimposio-api.onrender.com/auth/user/me', {
            headers: {
                Authorization:  `Bearer ${token}`
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
        const response = await axios.get('https://asistenciasimposio-api.onrender.com/asistencia/reporte/total-carrera', {
            headers: {
                Authorization:  `Bearer ${token}`
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
        const response = await axios.get('https://asistenciasimposio-api.onrender.com/asistencia/reporte/genero', {
            headers: {
                Authorization:  `Bearer ${token}`
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
        const response = await axios.get('https://asistenciasimposio-api.onrender.com/asistencia/reporte/tiempo-real', {
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

        <!-- Contenedor de tarjetas e imagen -->
        <div class="content-container">
            <div class="cards-container">
                <div class="card">
                    <h3>Asistencia por Carrera</h3>
                    <ul v-if="totalAsistenciaCarrera.length">
                        <li v-for="carrera in totalAsistenciaCarrera" :key="carrera.carrera">
                            <strong>{{ carrera.carrera }}</strong>: {{ carrera.total_asistentes }} asistentes
                        </li>
                    </ul>
                    <p v-else>Cargando datos...</p>
                </div>
                <div class="card">
                    <h3>Asistencia por Género</h3>
                    <p><strong>Hombres:</strong> {{ asistenciaGenero.total_hombres }}</p>
                    <p><strong>Mujeres:</strong> {{ asistenciaGenero.total_mujeres }}</p>
                </div>
                <div class="card">
                    <h3>Asistentes en Tiempo Real</h3>
                    <p class="text-large">{{ tiempoReal }}</p>
                </div>
            </div>
            <div class="image-container">
                <img src="@/assets/logocelote.jpg" alt="Simposio" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    padding: 2rem;
    text-align: center;
}

.welcome h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #003366;
}

.welcome h2 {
    font-size: 1.5rem;
    font-weight: 400;
    color: #c9a227;
}

.content-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
}

.cards-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.image-container {
    display: flex;
    align-items: center;
}

.image-container img {
    width: 490px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.card {
    padding: 1.5rem;
    border-radius: 10px;
    background: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    text-align: center;
    width: 350px;
}

.text-large {
    font-size: 2.5rem;
    font-weight: bold;
    color: #c9a227;
}
</style>