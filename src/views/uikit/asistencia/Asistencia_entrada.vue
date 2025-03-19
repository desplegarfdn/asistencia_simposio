<script setup>
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const scannedId = ref('');
const toast = useToast();
const inputRef = ref(null);
let scanTimeout = null;

const sendAttendance = async () => {
    if (!scannedId.value.trim()) return;

    try {
        // 🔹 Obtener el token desde localStorage
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'No hay sesión iniciada.', life: 3000 });
            return;
        }

        // 🔹 Enviar solicitud al backend
        const response = await axios.post(
            'https://asistenciasimposio-api.onrender.com/asistencia/entrada',
            {},
            {
                params: { persona_id: scannedId.value.trim() },
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // 🔹 Extraer el nombre de la respuesta
        const nombre = response.data.nombre_completo;

        // 🔹 Mostrar notificación de éxito con el nombre
        toast.add({
            severity: 'success',
            summary: 'Asistencia Registrada',
            detail: `ID: ${scannedId.value} - ${nombre}`,
            life: 3000
        });
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error al registrar',
            detail: error.response?.data?.detail || 'No se pudo registrar asistencia.',
            life: 3000
        });
    } finally {
        scannedId.value = ''; // Limpiar el campo para la siguiente lectura
        inputRef.value?.focus(); // Volver a enfocar el input oculto
    }
};

// 🔹 Manejar la entrada del lector con retraso
const handleScanInput = () => {
    if (scanTimeout) clearTimeout(scanTimeout); // Cancelar si ya hay un temporizador en curso

    scanTimeout = setTimeout(() => {
        sendAttendance(); // Esperar 300ms y luego procesar la entrada completa
    }, 300);
};

// 🔹 Detectar el escaneo automáticamente
onMounted(() => {
    inputRef.value?.focus();
});
</script>

<template>
    <div class="container mx-auto text-center mt-10">
        <h2 class="text-3xl font-bold mb-8">Escaneo de Asistencia Entrada</h2>

        <!-- Input oculto donde se detecta la entrada del lector -->
        <input ref="inputRef" v-model="scannedId" @input="handleScanInput" class="absolute opacity-0" autofocus />

        <p class="text-gray-700 text-lg">Escanea la matrícula o número de plaza...</p>

        <!-- Imagen Ocelote UNACH -->
        <div class="image-container">
            <img src="@/assets/logocelote.jpg" alt="Simposio" />
        </div>

        <!-- Notificaciones Toast -->
        <Toast />
    </div>
</template>

<style scoped>
.container {
    max-width: 500px; /* Aumentamos ligeramente el ancho */
    padding: 25px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.image-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.image-container img {
    width: 250px;
    height: auto;
    border-radius: 10px;
}
</style>
