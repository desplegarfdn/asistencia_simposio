<script setup>
import { useAuth } from '@/composables/useAuth';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import logounach from '@/assets/logosunach.jpg';
import nImage from '@/assets/banner.jpg';

// Hooks y variables reactivas
const { setToken } = useAuth();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
    errorMessage.value = '';

    if (!email.value.trim() || !password.value.trim()) {
        errorMessage.value = 'Por favor, completa todos los campos.';
        return;
    }

    try {
        // 🔹 Petición al backend para obtener el token
        const formData = new URLSearchParams();
        formData.append('username', email.value.trim());
        formData.append('password', password.value.trim());

        const loginResponse = await axios.post('http://127.0.0.1:8000/auth/login', formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // Extraer el token de la respuesta
        const { access_token } = loginResponse.data;

        // Decodificar el token para obtener el rol
        const payloadBase64 = access_token.split('.')[1];
        const payloadDecoded = JSON.parse(atob(payloadBase64));
        const role = payloadDecoded.role || 'usuario';

        // Guardar token y rol en localStorage
        setToken(access_token);
        localStorage.setItem('user_role', role);

        console.log('Token guardado:', access_token);
        console.log('Rol guardado en localStorage:', role);

        // 🔹 Redirigir al dashboard o recargar la página
        router.push('/dashboard');
    } catch (error) {
        if (error.response) {
            console.error('Error en la respuesta del login:', error.response.data);
            errorMessage.value = error.response.data.detail || 'Credenciales incorrectas.';
        } else {
            errorMessage.value = 'Error en la conexión. Intenta más tarde.';
        }
    }
};
</script>

<template>
    <div class="relative bg-cover bg-center bg-fixed min-h-screen min-w-[100vw]" :style="{ backgroundImage: `url(${nImage})` }">
        <div class="absolute inset-0 bg-black opacity-50"></div>

        <div class="relative flex flex-col items-center justify-center min-h-screen">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgb(0, 51, 102) 10%, rgb(201, 162, 39) 70%)">
                <div class="w-full bg-white py-8 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img :src="logounach" alt="Logo Bienestar" class="mb-8 w-45 h-auto mx-auto" />
                        <div class="text-900 text-3xl font-medium mb-3">Facultad de Negocios</div>
                        <div class="text-900 text-3xl font-medium mb-3">Simposio Internacional</div>
                        <span class="text-600 font-medium">Inicia sesión para continuar</span>
                    </div>

                    <div>
                        <label for="usuario" class="block text-900 text-xl font-medium mb-2">Usuario</label>
                        <InputText id="usuario" type="text" placeholder="Usuario" class="w-full md:w-[30rem] mb-5" v-model="email" />

                        <label for="contraseña" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="contraseña" v-model="password" placeholder="Contraseña" :toggleMask="true" class="w-full md:w-[30rem] mb-5" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <Button label="Ingresar" class="w-full p-button p-button-text custom-button" @click="handleLogin"></Button>

                        <div v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-button {
    background-color: #003366 !important; /* Azul UNACH */
    color: white !important;
    border: none !important;
    transition: background-color 0.3s ease !important;
}

.custom-button:hover {
    background-color: #c9a227 !important; /* Dorado UNACH */
}

.bg-cover {
    background-size: cover;
}

.bg-center {
    background-position: center;
}

.bg-fixed {
    background-attachment: fixed;
}
</style>
