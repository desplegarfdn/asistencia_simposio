<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import logoUnach from '@/assets/logo2.png'; // Logo UNACH

const toast = useToast();
const numeroPlaza = ref('');
const maestro = ref(null);
const loading = ref(false);
const token = localStorage.getItem('access_token');

// 🔹 Función para buscar maestro por número de plaza
const buscarMaestro = async () => {
    if (!numeroPlaza.value.trim()) {
        toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ingresa un número de plaza.', life: 3000 });
        return;
    }

    loading.value = true;
    maestro.value = null;

    try {
        const response = await axios.get(`http://127.0.0.1:8000/maestros/buscar/${numeroPlaza.value.trim()}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        maestro.value = response.data;
        toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `Maestro encontrado: ${maestro.value.nombre} ${maestro.value.apellido_p} ${maestro.value.apellido_m}`,
            life: 3000
        });
    } catch (error) {
        console.error('Error al buscar maestro:', error.response?.data || error.message);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Maestro no encontrado.', life: 3000 });
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="container">
        <Toast />

        <div class="header">
            <img :src="logoUnach" alt="Logo UNACH" class="logo" />
            <h1 class="titulo">Buscar Maestro</h1>
        </div>

        <div class="card">
            <div class="formulario">
                <label>Número de Plaza:</label>
                <div class="search-container">
                    <input type="text" v-model="numeroPlaza" placeholder="Ingresa el número de plaza" />
                    <button @click="buscarMaestro" :disabled="loading">
                        {{ loading ? 'Buscando...' : 'Buscar' }}
                    </button>
                </div>
            </div>

            <!-- 🔹 Mostrar datos del maestro si se encuentra -->
            <div v-if="maestro" class="datos-maestro">
                <h3>Datos del Maestro</h3>
                <table>
                    <tr>
                        <td><strong>Nombre:</strong></td>
                        <td>{{ maestro.nombre }}</td>
                    </tr>
                    <tr>
                        <td><strong>Apellido Paterno:</strong></td>
                        <td>{{ maestro.apellido_p }}</td>
                    </tr>
                    <tr>
                        <td><strong>Apellido Materno:</strong></td>
                        <td>{{ maestro.apellido_m }}</td>
                    </tr>
                    <tr>
                        <td><strong>Número de Plaza:</strong></td>
                        <td>{{ maestro.numero_plaza }}</td>
                    </tr>
                    <tr>
                        <td><strong>Genero:</strong></td>
                        <td>{{ maestro.genero }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 500px;
    margin: auto;
    padding: 15px;
}

.header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.logo {
    width: 50px;
    height: auto;
}

.titulo {
    font-size: 20px;
    font-weight: bold;
    color: #003366; /* Azul UNACH */
}

.card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
}

/* 🔹 Estilos compactos para la búsqueda */
.search-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 10px;
}

.search-container input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
}

/* 🔹 Botón de búsqueda unificado */
.search-container button {
    background-color: #c9a227; /* Dorado UNACH */
    color: white;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    width: 100%;
}

.search-container button:hover {
    background-color: #b8961e;
}

/* 🔹 Datos del maestro */
.datos-maestro {
    margin-top: 10px;
    padding: 12px;
    background: #f8f8f8;
    border-radius: 8px;
}

p {
    margin: 4px 0;
    font-size: 14px;
}

/* 🔹 Tabla compacta */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

td {
    padding: 6px;
    border-bottom: 1px solid #ddd;
}
</style>
