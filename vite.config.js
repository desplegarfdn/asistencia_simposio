import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(() => {
    return {
        base: '/', // 🔹 Define la base correctamente

        plugins: [vue()],

        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)) // 🔹 Asegura la ruta absoluta
            }
        },

        build: {
            outDir: 'dist', // 🔹 Render usa `dist/`
            chunkSizeWarningLimit: 2000
        },

        server: {
            port: 5173, // Opcional: solo afecta en local
            strictPort: true // 🔹 Evita conflictos de puertos
        }
    };
});
