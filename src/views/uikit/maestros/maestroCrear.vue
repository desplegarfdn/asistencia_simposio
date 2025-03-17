<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import logoUnach from '@/assets/logo2.png'; // Logo UNACH

const router = useRouter();
const toast = useToast();

// 🔹 Datos del nuevo maestro
const formData = ref({
    numero_plaza: '',
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    genero: ''
});

// 🔹 Estados de la UI
const loading = ref(false);
const token = localStorage.getItem('access_token');

// 🔹 Función para registrar un maestro
const registrarMaestro = async () => {
    if (!token) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No tienes permisos para crear maestros.',
            life: 3000
        });
        return;
    }

    // 🔹 Validación básica de campos vacíos
    if (!formData.value.numero_plaza || !formData.value.nombre || !formData.value.apellido_p || !formData.value.apellido_m || !formData.value.genero) {
        toast.add({
            severity: 'warn',
            summary: 'Advertencia',
            detail: 'Por favor, completa todos los campos.',
            life: 3000
        });
        return;
    }

    loading.value = true;

    try {
        const response = await axios.post('https://asistenciasimposio-api.onrender.com/crear', formData.value, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        toast.add({ severity: 'success', summary: 'Éxito', detail: 'Maestro registrado correctamente.', life: 3000 });

        // 🔹 Limpiar formulario después de la creación
        formData.value = {
            numero_plaza: '',
            nombre: '',
            apellido_p: '',
            apellido_m: '',
            genero: ''
        };

        setTimeout(() => {
            router.push('/dashboard');
        }, 2000);
    } catch (error) {
        console.error('Error al crear maestro:', error.response?.data || error.message);
        const errorMessage = error.response?.data?.detail || 'Error en la creación.';
        toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 4000 });
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
            <h1 class="titulo">Registrar Maestro</h1>
        </div>

        <div class="card">
            <div class="formulario">
                <div class="row">
                    <div class="column">
                        <label>Número de Plaza:</label>
                        <input type="text" v-model="formData.numero_plaza" placeholder="Número de Plaza" />

                        <label>Nombre:</label>
                        <input type="text" v-model="formData.nombre" placeholder="Nombre" />
                    </div>

                    <div class="column">
                        <label>Apellido Paterno:</label>
                        <input type="text" v-model="formData.apellido_p" placeholder="Apellido Paterno" />

                        <label>Apellido Materno:</label>
                        <input type="text" v-model="formData.apellido_m" placeholder="Apellido Materno" />
                    </div>
                </div>

                <label>Género:</label>
                <select v-model="formData.genero">
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>

                <button @click="registrarMaestro" :disabled="loading">
                    {{ loading ? 'Registrando...' : 'Registrar Maestro' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 700px;
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

.row {
    display: flex;
    gap: 20px;
}

.column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

label {
    font-weight: bold;
}

input,
select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    background-color: #c9a227; /* Dorado UNACH */
    color: white;
    padding: 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
    width: 100%;
}

button:hover {
    background-color: #b8961e;
}
</style>
