import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',  // Ruta para el Login
            name: 'login',
            component: () => import('@/views/pages/Login.vue'), // Carga el componente de Login
        },
        {
            path: '/dashboard',
            component: AppLayout,
            children: [
                {
                    path: '/dashboard',  // Ruta vacía que redirige al Dashboard
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/uikit/encuestas',
                    name: 'encuestas',
                    component: () => import('@/views/uikit/create_proyecto.vue')
                },
            ]
        }
    ]
});

export default router;