import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const isAuthenticated = () => {
    // Comprueba si el token existe y no ha expirado
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    try {
        const { exp } = JSON.parse(atob(token.split('.')[1])); // Decodifica el token JWT
        const currentTime = Math.floor(Date.now() / 1000);
        return exp > currentTime; // Verifica si el token ha expirado
    } catch (e) {
        return false;
    }
};

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', // Ruta para el Login
            name: 'login',
            component: () => import('@/views/pages/Login.vue'),
            beforeEnter: (to, from, next) => {
                if (isAuthenticated()) {
                    next('/dashboard'); // Redirige al dashboard si ya está autenticado
                } else {
                    next(); // Permite acceso al login
                }
            }
        },
        {
            path: '/dashboard',
            component: AppLayout,
            children: [
                {
                    path: '', // Ruta vacía que redirige al Dashboard
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/encuestas',
                    name: 'encuestas',
                    component: () => import('@/views/uikit/create_proyecto.vue'),
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*', // Ruta para páginas no encontradas
            redirect: '/'
        }
    ]
});

// Guard global para proteger rutas
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/'); // Redirige al login si no está autenticado
    } else {
        next(); // Permite acceso
    }
});

export default router;
