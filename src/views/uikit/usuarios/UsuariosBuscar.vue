<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { UserIcon, ShieldIcon, BadgeCheckIcon } from 'lucide-vue-next'; // Importamos iconos

const toast = useToast();
const username = ref('');
const usuario = ref(null);
const loading = ref(false);

// Obtener token de autenticación
const token = localStorage.getItem('access_token');

const buscarUsuario = async () => {
    if (!username.value.trim()) {
        toast.add({ severity: 'warn', summary: 'Atención', detail: 'Ingresa un nombre de usuario.', life: 3000 });
        return;
    }

    if (!token) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No tienes permisos para buscar usuarios.', life: 3000 });
        return;
    }

    loading.value = true; // Activar loading mientras se hace la consulta

    try {
        const response = await axios.get(`https://asistenciasimposio-api.onrender.com/usuarios/buscar/${username.value.trim()}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        usuario.value = response.data; // Guardamos los datos del usuario
        toast.add({
            severity: 'success',
            summary: 'Usuario encontrado',
            detail: `Usuario: ${usuario.value.username}`,
            life: 4000
        });
    } catch (error) {
        usuario.value = null; // Reset en caso de error

        if (error.response?.status === 404) {
            toast.add({ severity: 'warn', summary: 'No encontrado', detail: 'El usuario no existe.', life: 4000 });
        } else if (error.response?.status === 403) {
            toast.add({ severity: 'error', summary: 'Acceso denegado', detail: 'No tienes permisos.', life: 4000 });
        } else {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un problema al buscar el usuario.',
                life: 4000
            });
        }
    } finally {
        loading.value = false; // Desactivar loading después de la consulta
    }
};
</script>

<template>
    <div class="container">
        <Toast />

        <div class="card">
            <h2 class="titulo">Buscar Usuario</h2>

            <div class="search-bar">
                <input type="text" v-model="username" placeholder="Ingrese el nombre de usuario" />
                <button @click="buscarUsuario" :disabled="loading">
                    {{ loading ? 'Buscando...' : 'Buscar' }}
                </button>
            </div>

            <!-- Mostrar datos si el usuario fue encontrado -->
            <div v-if="usuario" class="user-card">
                <div class="avatar">
                    <UserIcon size="50" />
                </div>

                <div class="user-info">
                    <h3 class="nombre">{{ usuario.nombre }} {{ usuario.apellido_paterno }} {{ usuario.apellido_materno }}</h3>

                    <div class="info-item">
                        <BadgeCheckIcon size="20" />
                        <span><strong>Usuario:</strong> {{ usuario.username }}</span>
                    </div>

                    <div class="info-item">
                        <ShieldIcon size="20" />
                        <span><strong>Rol:</strong> {{ usuario.role }}</span>
                    </div>
                </div>
            </div>

            <!-- Mensaje si no se ha buscado nada -->
            <p v-else class="info-text">Ingresa un nombre de usuario para buscar.</p>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.15);
    text-align: center;
}

.titulo {
    font-size: 22px;
    font-weight: bold;
    color: #003366; /* Azul UNACH */
    margin-bottom: 15px;
}

.search-bar {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
}

input {
    padding: 10px;
    width: 70%;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

button {
    background-color: #c9a227; /* Dorado UNACH */
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
}

button:hover {
    background-color: #b8961e;
}

/* Tarjeta de usuario */
.user-card {
    display: flex;
    align-items: center;
    gap: 15px;
    background: #f5f5f5;
    padding: 15px;
    border-radius: 10px;
    text-align: left;
    margin-top: 15px;
}

.avatar {
    background: #003366;
    color: white;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.nombre {
    color: #003366;
    font-size: 18px;
    font-weight: bold;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
}

.info-text {
    color: gray;
    font-size: 14px;
}
</style>
