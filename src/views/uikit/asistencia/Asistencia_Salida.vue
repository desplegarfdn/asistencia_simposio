<script setup>
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const scannedId = ref('');
const toast = useToast();
const inputRef = ref(null);
let scanTimeout = null;

const processScan = async () => {
    if (!scannedId.value.trim()) return;

    try {
        // 🔹 Obtener el token desde localStorage
        const token = localStorage.getItem('access_token');
        if (!token) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'No hay sesión iniciada.', life: 3000 });
            return;
        }

        // 🔹 Intentar registrar salida primero
        try {
            await axios.post(
                'http://127.0.0.1:8000/asistencia/salida',
                {},
                {
                    params: { persona_id: scannedId.value.trim() },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // 🔹 Si se registró la salida, mostrar mensaje y terminar
            toast.add({ severity: 'success', summary: 'Salida Registrada', detail: `ID: ${scannedId.value}`, life: 3000 });
        } catch (error) {
            if (error.response?.status === 404) {
                // 🔹 Si el backend responde con 404, significa que NO había entrada, entonces registramos la entrada
                await axios.post(
                    'http://127.0.0.1:8000/asistencia/entrada',
                    {},
                    {
                        params: { persona_id: scannedId.value.trim() },
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                toast.add({ severity: 'success', summary: 'Entrada Registrada', detail: `ID: ${scannedId.value}`, life: 3000 });
            } else {
                // 🔹 Cualquier otro error
                throw error;
            }
        }
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
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
        processScan(); // Esperar 300ms y luego procesar la entrada completa
    }, 300);
};

// 🔹 Detectar el escaneo automáticamente
onMounted(() => {
    inputRef.value?.focus();
});
</script>

<template>
    <div class="container mx-auto text-center mt-10">
        <h2 class="text-3xl font-bold mb-8">Escaneo de Asistencia Salida</h2>

        <!-- Input oculto donde se detecta la entrada del lector -->
        <input ref="inputRef" v-model="scannedId" @input="handleScanInput" class="absolute opacity-0" autofocus />

        <p class="text-gray-700 text-lg">Escanea la matrícula o número de plaza...</p>

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
</style>
