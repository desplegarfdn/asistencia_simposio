import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(() => {
    return {
        base: '/', // 🔹 Importante para Render y evitar errores 404 en rutas

        plugins: [vue()],

        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },

        build: {
            outDir: 'dist', // 🔹 Render usa `dist/` como carpeta pública
            chunkSizeWarningLimit: 2000 // Ajusta el límite a 2000 KB (2 MB)
        },

        server: {
            port: 3000, // Opcional: Puedes cambiarlo si es necesario
            historyApiFallback: true // 🔹 Evita errores 404 en rutas anidadas
        }
    };
});
