<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const token = localStorage.getItem('access_token');

// 📌 Estados generales
const fecha = ref('');
const carrera = ref('');
const fechaInicio = ref('');
const fechaFin = ref('');
const reportes = ref({
    diaCarrera: null,
    totalCarrera: null,
    diaGeneral: null,
    general3Dias: null,
    genero: null,
    tiempoReal: null
});
const loading = ref({
    diaCarrera: false,
    totalCarrera: false,
    diaGeneral: false,
    general3Dias: false,
    genero: false,
    tiempoReal: false
});

// 📌 Función para obtener reportes
const obtenerReporte = async (tipo) => {
    let url = '';
    let params = {};

    switch (tipo) {
        case 'diaCarrera':
            url = `https://asistenciasimposio-api.onrender.com/asistencia/reporte/dia-carrera`;
            params = { fecha: fecha.value, carrera: carrera.value };
            break;
        case 'totalCarrera':
            url = `https://asistenciasimposio-api.onrender.com/asistencia/reporte/total-carrera`;
            break;
        case 'diaGeneral':
            url = `https://asistenciasimposio-api.onrender.com/asistencia/reporte/dia-general`;
            params = { fecha: fecha.value };
            break;
        case 'general3Dias':
            url = `https://asistenciasimposio-api.onrender.com/asistencia/reporte/general-3dias`;
            params = { fecha_inicio: fechaInicio.value, fecha_fin: fechaFin.value };
            break;
        case 'genero':
            url = `https://asistenciasimposio-api.onrender.com/asistencia/reporte/genero`;
            break;
        case 'tiempoReal':
            url = `https://asistenciasimposio-api.onrender.com/asistencia/reporte/tiempo-real`;
            params = carrera.value ? { carrera: carrera.value } : {};
            break;
    }

    loading.value[tipo] = true;
    try {
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
            params
        });

        reportes.value[tipo] = response.data;
        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Reporte generado.', life: 3000 });
    } catch (error) {
        console.error('Error en el reporte:', error.response?.data || error.message);
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener el reporte.', life: 3000 });
    } finally {
        loading.value[tipo] = false;
    }
};
</script>

<template>
    <div class="container">
        <Toast />
        <h1 class="titulo">📊 Reportes de Asistencia</h1>

        <!-- 📌 Reporte por Día y Carrera -->
        <div class="reporte-card">
            <h2>📅 Reporte por Día y Carrera</h2>
            <div class="inputs">
                <input type="date" v-model="fecha" class="input-box" />
                <input type="text" v-model="carrera" placeholder="Ej. LSC" class="input-box" />
            </div>
            <button class="btn" @click="obtenerReporte('diaCarrera')" :disabled="loading.diaCarrera">
                {{ loading.diaCarrera ? 'Cargando...' : 'Generar' }}
            </button>
            <p v-if="reportes.diaCarrera">Total Asistentes: {{ reportes.diaCarrera.total_asistentes }}</p>
        </div>

        <!-- 📌 Reporte Total por Carrera -->
        <div class="reporte-card">
            <h2>🎓 Total Asistencia por Carrera</h2>
            <button class="btn" @click="obtenerReporte('totalCarrera')" :disabled="loading.totalCarrera">
                {{ loading.totalCarrera ? 'Cargando...' : 'Generar' }}
            </button>
            <ul v-if="reportes.totalCarrera">
                <li v-for="c in reportes.totalCarrera" :key="c.carrera">{{ c.carrera }}: {{ c.total_asistentes }} asistentes</li>
            </ul>
        </div>

        <!-- 📌 Reporte General por Día -->
        <div class="reporte-card">
            <h2>📅 Reporte General por Día</h2>
            <input type="date" v-model="fecha" class="input-box" />
            <button class="btn" @click="obtenerReporte('diaGeneral')" :disabled="loading.diaGeneral">
                {{ loading.diaGeneral ? 'Cargando...' : 'Generar' }}
            </button>
            <p v-if="reportes.diaGeneral">Total Asistentes: {{ reportes.diaGeneral.total_asistentes }}</p>
        </div>

        <!-- 📌 Reporte de los 3 Días -->
        <div class="reporte-card">
            <h2>📅 Reporte General de los 3 Días</h2>
            <div class="inputs">
                <input type="date" v-model="fechaInicio" class="input-box" />
                <input type="date" v-model="fechaFin" class="input-box" />
            </div>
            <button class="btn" @click="obtenerReporte('general3Dias')" :disabled="loading.general3Dias">
                {{ loading.general3Dias ? 'Cargando...' : 'Generar' }}
            </button>
            <p v-if="reportes.general3Dias">Alumnos: {{ reportes.general3Dias.total_alumnos }} | Maestros: {{ reportes.general3Dias.total_maestros }}</p>
        </div>

        <!-- 📌 Reporte por Género -->
        <div class="reporte-card">
            <h2>🚻 Reporte de Asistencia por Género</h2>
            <button class="btn" @click="obtenerReporte('genero')" :disabled="loading.genero">
                {{ loading.genero ? 'Cargando...' : 'Generar' }}
            </button>
            <p v-if="reportes.genero">Hombres: {{ reportes.genero.total_hombres }} | Mujeres: {{ reportes.genero.total_mujeres }}</p>
        </div>

        <!-- 📌 Tiempo Real -->
        <div class="reporte-card">
            <h2>⏳ Asistentes en Tiempo Real</h2>
            <input type="text" v-model="carrera" placeholder="Ej. LSC (Opcional)" class="input-box" />
            <button class="btn" @click="obtenerReporte('tiempoReal')" :disabled="loading.tiempoReal">
                {{ loading.tiempoReal ? 'Cargando...' : 'Generar' }}
            </button>
            <p v-if="reportes.tiempoReal">Total Hoy: {{ reportes.tiempoReal.total_asistentes }}</p>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 700px;
    margin: auto;
    padding: 20px;
}

.titulo {
    text-align: center;
    color: #800040;
}

.reporte-card {
    background: white;
    padding: 20px;
    margin: 15px 0;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
}

.input-box {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
}

.btn {
    background-color: #c9a227;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
