<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import logoUnach from '@/assets/logo2.png'; // Logo UNACH

const router = useRouter();
const toast = useToast();

// Estados
const username = ref('');
const usuario = ref(null);
const loading = ref(false);
const mostrarConfirmacion = ref(false);
const token = localStorage.getItem('access_token');

// 🔹 Función para buscar usuario antes de eliminarlo
const buscarUsuario = async () => {
    if (!username.value.trim()) {
        toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ingresa un nombre de usuario.', life: 3000 });
        return;
    }

    loading.value = true;
    usuario.value = null;

    try {
        const response = await axios.get(`https://asistenciasimposio-api.onrender.com/usuarios/buscar/${username.value.trim()}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        usuario.value = response.data;
        toast.add({
            severity: 'info',
            summary: 'Usuario encontrado',
            detail: `Verifica los datos antes de eliminar.`,
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

// 🔹 Función para abrir la confirmación antes de eliminar
const abrirConfirmacion = () => {
    if (!usuario.value) {
        toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'Primero busca al usuario.', life: 3000 });
        return;
    }
    mostrarConfirmacion.value = true;
};

// 🔹 Función para eliminar el usuario
const eliminarUsuario = async () => {
    if (!token) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No tienes permisos para eliminar usuarios.',
            life: 3000
        });
        return;
    }

    loading.value = true;

    try {
        await axios.delete(`https://asistenciasimposio-api.onrender.com/usuarios/eliminar/${username.value.trim()}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        toast.add({
            severity: 'success',
            summary: 'Usuario eliminado',
            detail: `El usuario ${username.value} ha sido eliminado.`,
            life: 3000
        });

        setTimeout(() => {
            router.push('/dashboard');
        }, 2000);
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.response?.data?.detail || 'Error al eliminar usuario.',
            life: 4000
        });
    } finally {
        loading.value = false;
        mostrarConfirmacion.value = false;
    }
};
</script>

<template>
    <div class="container">
        <Toast />

        <Dialog v-model:visible="mostrarConfirmacion" modal :closable="false" class="dialogo">
            <div class="confirmacion">
                <i class="pi pi-exclamation-triangle icono"></i>
                <h2>¿Está seguro de eliminar este usuario?</h2>
                <p>Esta acción no se puede deshacer.</p>
                <div class="botones">
                    <Button label="Cancelar" class="p-button-text p-button-danger" @click="mostrarConfirmacion = false" />
                    <Button label="Eliminar" class="p-button-text p-button-success" @click="eliminarUsuario" />
                </div>
            </div>
        </Dialog>

        <div class="header">
            <img :src="logoUnach" alt="Logo UNACH" class="logo" />
            <h1 class="titulo">Eliminar Usuario</h1>
        </div>

        <div class="card">
            <label>Nombre de Usuario:</label>
            <div class="search-container">
                <input type="text" v-model="username" placeholder="Ingresa el username" />
                <button @click="buscarUsuario" :disabled="loading">
                    {{ loading ? 'Buscando...' : 'Buscar' }}
                </button>
            </div>

            <div v-if="usuario" class="datos-usuario">
                <h3>Datos del Usuario</h3>
                <p><strong>Nombre:</strong> {{ usuario.nombre }} {{ usuario.apellido_paterno }} {{ usuario.apellido_materno }}</p>
                <p><strong>Rol:</strong> {{ usuario.role }}</p>

                <button class="eliminar" @click="abrirConfirmacion" :disabled="loading">
                    {{ loading ? 'Procesando...' : 'Eliminar Usuario' }}
                </button>
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
