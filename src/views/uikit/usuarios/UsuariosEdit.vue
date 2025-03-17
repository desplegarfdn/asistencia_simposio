<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import logoUnach from '@/assets/logo2.png'; // Logo UNACH

const router = useRouter();
const toast = useToast();

// Datos del usuario a editar
const username = ref('');
const formData = ref({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    role: 'capturista'
});

// Estados de la UI
const loading = ref(false);
const userFound = ref(false);
const token = localStorage.getItem('access_token');

// 🔹 Función para buscar usuario
const buscarUsuario = async () => {
    userFound.value = false;
    loading.value = true;

    if (!username.value.trim()) {
        toast.add({ severity: 'warn', summary: 'Atención', detail: 'Ingresa un nombre de usuario.', life: 3000 });
        loading.value = false;
        return;
    }

    if (!token) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No tienes permisos para buscar usuarios.', life: 3000 });
        loading.value = false;
        return;
    }

    try {
        const response = await axios.get(`https://asistenciasimposio-api.onrender.com/usuarios/buscar/${username.value.trim()}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        formData.value = {
            nombre: response.data.nombre,
            apellido_paterno: response.data.apellido_paterno,
            apellido_materno: response.data.apellido_materno,
            role: response.data.role
        };

        userFound.value = true;
        toast.add({
            severity: 'success',
            summary: 'Usuario encontrado',
            detail: `Editando a ${username.value}`,
            life: 3000
        });
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response?.data?.detail || 'Usuario no encontrado.',
            life: 3000
        });
    } finally {
        loading.value = false;
    }
};

// 🔹 Función para actualizar usuario
const actualizarUsuario = async () => {
    if (!token) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No tienes permisos para editar usuarios.', life: 3000 });
        return;
    }

    try {
        await axios.put(`https://asistenciasimposio-api.onrender.com/usuarios/editar/${username.value.trim()}`, formData.value, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `Usuario ${username.value} actualizado correctamente.`,
            life: 3000
        });

        setTimeout(() => {
            router.push('/dashboard');
        }, 2000);
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error en la actualización',
            detail: error.response?.data?.detail || 'No se pudo actualizar.',
            life: 4000
        });
    }
};
</script>

<template>
    <div class="container">
        <Toast />

        <div class="header">
            <img :src="logoUnach" alt="Logo UNACH" class="logo" />
            <h1 class="titulo">Editar Usuario</h1>
        </div>

        <div class="card">
            <label>Nombre de Usuario:</label>
            <div class="search-container">
                <input type="text" v-model="username" placeholder="Ingresa el username" />
                <button @click="buscarUsuario" :disabled="loading">
                    {{ loading ? 'Buscando...' : 'Buscar' }}
                </button>
            </div>

            <div v-if="userFound">
                <h2 class="subtitulo">Información del Usuario</h2>
                <div class="row">
                    <div class="column">
                        <label>Nombre:</label>
                        <input type="text" v-model="formData.nombre" placeholder="Nombre" />

                        <label>Apellido Paterno:</label>
                        <input type="text" v-model="formData.apellido_paterno" placeholder="Apellido Paterno" />

                        <label>Apellido Materno:</label>
                        <input type="text" v-model="formData.apellido_materno" placeholder="Apellido Materno" />
                    </div>

                    <div class="column">
                        <label>Rol:</label>
                        <select v-model="formData.role">
                            <option value="capturista">Capturista</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                <button @click="actualizarUsuario">Actualizar Usuario</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 800px;
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
    width: 70px;
    height: auto;
}

.titulo {
    font-size: 24px;
    font-weight: bold;
    color: #003366; /* Azul UNACH */
}

.card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.15);
}

.search-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
}

.search-container input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
}

/* 🔹 Botón de búsqueda estandarizado */
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
    width: 100%; /* Botón ocupa todo el ancho */
}

.search-container button:hover {
    background-color: #b8961e; /* Dorado más oscuro */
}

/* Sección de información */
.subtitulo {
    font-size: 18px;
    font-weight: bold;
    color: #003366;
    margin-bottom: 10px;
    border-bottom: 2px solid #c9a227;
    padding-bottom: 5px;
}

/* Diseño de columnas */
.row {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
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
    font-size: 16px;
}

/* Botón general */
button {
    background-color: #c9a227; /* Dorado UNACH */
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
}

button:hover {
    background-color: #b8961e; /* Dorado más oscuro */
}
</style>
