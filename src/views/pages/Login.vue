<script setup>
import { useAuth } from '@/composables/useAuth'; // Importa el composable
import axios from 'axios';
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { useRouter } from 'vue-router';
import logoBienestar from '@/assets/logo_bienestar.png';
import palacioImage from '@/assets/palacio.jpg'; // Importa la imagen

const { setToken } = useAuth(); // Desestructurar el setToken

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const router = useRouter(); // Obtén el router

const handleLogin = async () => {
  errorMessage.value = '';

  if (!email.value.trim() || !password.value.trim()) {
    errorMessage.value = 'Por favor, completa todos los campos.';
    return;
  }

  const data = new URLSearchParams();
  data.append('grant_type', 'password');
  data.append('username', email.value.trim());
  data.append('password', password.value.trim());
  data.append('scope', '');
  data.append('client_id', '');
  data.append('client_secret', '');

  try {
    const response = await axios.post('https://encuestas-municipio.onrender.com/auth/login', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Almacena el token usando el composable
    setToken(response.data.access_token);

    // Redirige al usuario a la página del dashboard
    router.push({ name: 'dashboard' });
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      errorMessage.value = error.response.data.detail || 'Credenciales incorrectas. Inténtalo de nuevo.';
    } else {
      errorMessage.value = 'Error en la conexión. Intenta más tarde.';
    }
  }
}
</script>

<template>
  <div class="relative bg-cover bg-center bg-fixed min-h-screen min-w-[100vw]" style="background-image: url('/src/assets/palacio.jpg')">
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <div class="relative flex flex-col items-center justify-center min-h-screen">
      <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgb(148, 43, 55) 10%, rgba(148, 43, 55, 0) 30%)">
        <div class="w-full bg-white py-8 px-8 sm:px-20" style="border-radius: 53px">
          <div class="text-center mb-5">
            <img :src="logoBienestar" alt="Logo Bienestar" class="mb-8 w-45 h-auto mx-auto">
            <div class="text-900 text-3xl font-medium mb-3">Secretaría del Bienestar</div>
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
  background-color: #942B37 !important; /* Color guinda */
  color: white !important;
  border: none !important;
  transition: background-color 0.3s ease !important;
}

.custom-button:hover {
  background-color: #a88d52 !important;
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