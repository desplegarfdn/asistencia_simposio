<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const nombreCompleto = ref('');
const ultimoFolio = ref('Sin información');
const totalEncuestas = ref(0);

// Obtener token JWT desde localStorage
const obtenerToken = () => localStorage.getItem('access_token');

// Función para obtener los datos del usuario
const obtenerUsuario = async () => {
  try {
    const token = obtenerToken();
    const response = await axios.get('https://encuestas-municipio.onrender.com/auth/usuarios/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { nombre, username } = response.data;
    nombreCompleto.value = `${nombre} ` || username;

    // Obtener los datos relacionados con el usuario
    await obtenerUltimoFolio(username, token);
    await obtenerTotalEncuestas(username, token);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    nombreCompleto.value = 'Usuario desconocido';
  }
};

// Función para obtener el último folio registrado
const obtenerUltimoFolio = async (username, token) => {
  try {
    const response = await axios.get(`https://encuestas-municipio.onrender.com/acciones/ultimo_folio/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    ultimoFolio.value = response.data || 'Sin información';
  } catch (error) {
    console.error('Error al obtener el último folio:', error);
    ultimoFolio.value = 'Error al cargar';
  }
};

// Función para obtener el total de encuestas registradas
const obtenerTotalEncuestas = async (username, token) => {
  try {
    const response = await axios.get(`https://encuestas-municipio.onrender.com/acciones/contador/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    totalEncuestas.value = response.data || 0;
  } catch (error) {
    console.error('Error al obtener el total de encuestas:', error);
    totalEncuestas.value = 'Error al cargar';
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  obtenerUsuario();
});
</script>

<template>
  <div class="dashboard">
    <!-- Mensaje de bienvenida -->
    <div class="welcome">
      <h1>¡ Bienvenido/a, {{ nombreCompleto }}!</h1>
      <h2>Sistema de Encuestas de la Secretaría del Bienestar Municipal</h2>
    </div>

    <!-- Recuadros -->
    <div class="grid">
      <div class="card large-card">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Último folio registrado</span>
            <div class="text-900 font-medium text-2xl">{{ ultimoFolio }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 3.5rem; height: 3.5rem">
            <i class="pi pi-folder text-blue-500 text-3xl"></i>
          </div>
        </div>
      </div>

      <div class="card large-card">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Total de encuestas registradas</span>
            <div class="text-900 font-medium text-2xl">{{ totalEncuestas }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 3.5rem; height: 3.5rem">
            <i class="pi pi-chart-bar text-cyan-500 text-3xl"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 2rem;
}

.welcome {
  text-align: center;
  margin-bottom: 3rem; /* Incrementa el espacio debajo del mensaje de bienvenida */
}

.welcome h1 {
  font-size: 6rem;
  font-weight: bold;
  color: #800040;
}

.welcome h2 {
  font-size: 3rem;
  font-weight: 400;
  color: #333;
}

.grid {
  display: flex; /* Usamos flexbox */
  flex-direction: column; /* Alineamos en columna */
  justify-content: center; /* Centra verticalmente si hay más espacio */
  align-items: center; /* Centra horizontalmente */
  gap: 1rem; /* Espacio entre las tarjetas */
}

.large-card {
  padding: 2rem; /* Aumenta el padding interno */
  border-radius: 15px;
  background: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px; /* Haz la tarjeta más ancha */
  height: 150px; /* Haz la tarjeta más alta */
}

.large-card .block {
  font-size: 1.2rem;
}

.large-card .text-2xl {
  font-size: 2rem;
}
</style>
