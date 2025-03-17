<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const user = ref(null);
const router = useRouter();

// 🔹 Cargar datos del usuario autenticado
onMounted(async () => {
    try {
        const token = localStorage.getItem('access_token'); // Obtener el token de localStorage
        const response = await axios.get('https://asistenciasimposio-api.onrender.com/auth/user/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Solo los datos disponibles en el endpoint
        const { username, nombre, apellido_paterno, apellido_materno, role } = response.data;
        user.value = { username, nombre, apellido_paterno, apellido_materno, role };
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
    }
});

// 🔹 Función para cerrar sesión
const logout = () => {
    localStorage.removeItem('access_token'); // Eliminar el token
    router.push('/'); // Redirigir al login
};
</script>

<template>
    <div class="user-card">
        <div class="card-header">
            <div class="profile-icon">
                <i class="pi pi-user"></i>
            </div>
        </div>
        <div class="card-body">
            <h2 v-if="user">{{ user.nombre }} {{ user.apellido_paterno }} {{ user.apellido_materno }}</h2>
            <div v-if="user">
                <p class="info"><strong>Usuario:</strong> {{ user.username }}</p>
                <p class="info"><strong>Rol:</strong> {{ user.role }}</p>
            </div>
            <div v-else>
                <p>Cargando información del usuario...</p>
            </div>
            <button class="logout-btn" @click="logout"><i class="pi pi-power-off"></i> Cerrar sesión</button>
        </div>
    </div>
</template>

<style scoped>
.user-card {
    width: 320px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    font-family: 'Arial', sans-serif;
    text-align: center;
    margin: 20px auto;
    transition: transform 0.3s ease-in-out;
}

.user-card:hover {
    transform: translateY(-5px);
}

/* 🔹 Azul UNACH en el encabezado */
.card-header {
    background: linear-gradient(135deg, #003366, #0055a4);
    padding: 20px 0;
}

.profile-icon {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: white;
    color: #003366; /* Azul UNACH */
    font-size: 4rem;
    border: 4px solid white;
}

.card-body {
    padding: 15px;
}

.card-body h2 {
    margin: 10px 0;
    font-size: 1.5em;
    font-weight: bold;
    color: #003366; /* Azul UNACH */
}

.card-body .info {
    margin: 5px 0;
    font-size: 1em;
    color: #666;
}

/* 🔹 Botón con colores UNACH */
.logout-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 10px 20px;
    background-color: #c9a227; /* Dorado UNACH */
    color: white;
    font-size: 1em;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 15px;
    transition: background-color 0.3s ease-in-out;
}

.logout-btn i {
    font-size: 1.2em;
}

/* 🔹 Hover con dorado más oscuro */
.logout-btn:hover {
    background-color: #b8961e; /* Dorado UNACH más oscuro */
}
</style>
