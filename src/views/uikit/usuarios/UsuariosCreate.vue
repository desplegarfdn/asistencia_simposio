<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import logoUnach from '@/assets/logo2.png'; // Asegúrate de cambiar esto por el logo correcto

const router = useRouter();
const toast = useToast();
const loading = ref(false); // Estado para mostrar que el registro está en proceso

// Datos del formulario de registro
const formData = ref({
    username: '',
    password: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    numero_telefono: '',
    correo: '',
    direccion: '',
    role: 'capturista'
});

// Opciones de roles
const roleOptions = ref([
    { label: 'Capturista', value: 'capturista' },
    { label: 'Admin', value: 'admin' }
]);

// Obtener token de autenticación
const token = localStorage.getItem('access_token');

const registrarUsuario = async () => {
    if (!token) {
        toast.add({
            severity: 'error',
            summary: 'Permiso denegado',
            detail: 'No tienes permisos para registrar usuarios.',
            life: 4000
        });
        return;
    }

    loading.value = true; // Mostrar estado de carga
    try {
        const response = await axios.post('http://127.0.0.1:8000/usuarios/crear', formData.value, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        toast.add({
            severity: 'success',
            summary: 'Usuario registrado',
            detail: `El usuario ${formData.value.username} ha sido registrado exitosamente.`,
            life: 4000
        });

        console.log('Usuario registrado:', response.data);

        setTimeout(() => {
            router.push('/dashboard');
        }, 2000);
    } catch (error) {
        console.error('Error al registrar usuario:', error.response ? error.response.data : error.message);

        let errorMessage = 'Error en el registro.';
        if (error.response?.data?.detail) {
            errorMessage = error.response.data.detail;
        } else if (error.response?.status === 400) {
            errorMessage = 'Datos inválidos, revisa los campos.';
        } else if (error.response?.status === 409) {
            errorMessage = 'El usuario ya existe.';
        }

        toast.add({
            severity: 'error',
            summary: 'Registro fallido',
            detail: errorMessage,
            life: 5000
        });
    } finally {
        loading.value = false; // Ocultar estado de carga
    }
};
</script>

<template>
    <div class="container">
        <Toast />
        <div class="header">
            <img :src="logoUnach" alt="Logo UNACH" class="logo" />
            <h1 class="titulo">Registrar Nuevo Usuario</h1>
        </div>

        <div class="card">
            <!-- Sección de información personal -->
            <h2 class="section-title">Información Personal</h2>
            <div class="row">
                <div class="column">
                    <label>Nombre:</label>
                    <input type="text" v-model="formData.nombre" placeholder="Nombre" />

                    <label>Apellido Paterno:</label>
                    <input type="text" v-model="formData.apellido_paterno" placeholder="Apellido Paterno" />

                    <label>Apellido Materno:</label>
                    <input type="text" v-model="formData.apellido_materno" placeholder="Apellido Materno" />
                </div>
            </div>

            <!-- Sección de datos de acceso -->
            <h2 class="section-title">Datos de Acceso</h2>
            <div class="row">
                <div class="column">
                    <label>Usuario:</label>
                    <input type="text" v-model="formData.username" placeholder="Nombre de usuario" />

                    <label>Contraseña:</label>
                    <input type="password" v-model="formData.password" placeholder="Contraseña" />
                </div>

                <div class="column">
                    <label>Rol:</label>
                    <select v-model="formData.role">
                        <option v-for="option in roleOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Botón de registrar -->
            <div class="button-container">
                <button @click="registrarUsuario" :disabled="loading">
                    {{ loading ? 'Registrando...' : 'Registrar Usuario' }}
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

/* Secciones del formulario */
.section-title {
    font-size: 18px;
    font-weight: bold;
    color: #003366;
    margin-bottom: 10px;
    border-bottom: 2px solid #c9a227;
    padding-bottom: 5px;
}

/* Diseño de filas y columnas */
.row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

label {
    font-weight: bold;
    font-size: 16px;
}

input,
select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

/* Botón centrado */
.button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

button {
    background-color: #c9a227; /* Dorado UNACH */
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
}

button:hover {
    background-color: #b8961e; /* Dorado más oscuro */
}

/* Deshabilitar botón cuando está en proceso */
button:disabled {
    background-color: #d1b45a;
    cursor: not-allowed;
}
</style>
