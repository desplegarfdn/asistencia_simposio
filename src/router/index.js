import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('user_role');

    if (!token || !role) return false;

    try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return exp > currentTime;
    } catch (e) {
        return false;
    }
};

const getUserRole = () => {
    return localStorage.getItem('user_role') || 'capturista';
};

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('@/views/pages/Login.vue'),
            beforeEnter: (to, from, next) => {
                if (isAuthenticated()) {
                    next('/dashboard');
                } else {
                    next();
                }
            }
        },
        {
            path: '/dashboard',
            component: AppLayout,
            children: [
                //DASHBOARD
                {
                    path: '',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                    meta: { requiresAuth: true }
                },
                //_______________________________
                //ASISTENCIA
                {
                    path: '/asistencia/entrada',
                    name: 'entrada',
                    component: () => import('@/views/uikit/asistencia/Asistencia_entrada.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/asistencia/salida',
                    name: 'salida',
                    component: () => import('@/views/uikit/asistencia/Asistencia_Salida.vue'),
                    meta: { requiresAuth: true }
                },
                //_______________________________
                // Rutas solo accesibles por admin
                //USUARIOS
                {
                    path: '/usuario/usuariobuscar',
                    name: 'usuariosbuscar',
                    component: () => import('@/views/uikit/usuarios/UsuariosBuscar.vue'),
                    meta: { requiresAuth: true, requiresAdmin: true }
                },
                {
                    path: '/usuario/usuariocrear',
                    name: 'usuarioscrear',
                    component: () => import('@/views/uikit/usuarios/UsuariosCreate.vue'),
                    meta: { requiresAuth: true, requiresAdmin: true }
                },
                {
                    path: '/usuario/usuarioeditar',
                    name: 'usuarioseditar',
                    component: () => import('@/views/uikit/usuarios/UsuariosEdit.vue'),
                    meta: { requiresAuth: true, requiresAdmin: true }
                },
                {
                    path: '/usuario/usuarioeliminar',
                    name: 'usuarioseliminar',
                    component: () => import('@/views/uikit/usuarios/UsuariosEliminar.vue'),
                    meta: { requiresAuth: true, requiresAdmin: true }
                },
                //_______________________________
                //MAESTROS
                {
                    path: '/maestros/maestrobuscar',
                    name: 'maestrobuscar',
                    component: () => import('@/views/uikit/maestros/maestroBuscar.vue'),
                    meta: { requiresAuth: true, requiresAdmin: true }
                },
                {
                    path: '/maestros/maestrocrear',
                    name: 'maestrocrear',
                    component: () => import('@/views/uikit/maestros/maestroCrear.vue'),
                    meta: { requiresAuth: true, requiresAdmin: true }
                },
                {
                    path: '/maestros/maestroVerTodos',
                    name: 'maestrovertodos',
                    component: () => import('@/views/uikit/maestros/maestroVerTodos.vue'),
                    meta: { requiresAuth: true, requiresAdmin: true }
                },
                //______________________________
                //ALUMNOS
                {
                    path: '/alumnos/alumnobuscar',
                    name: 'alumnobuscar',
                    component: () => import('@/views/uikit/alumnos/alumnoBuscar.vue'),
                    meta: { requiresAuth: true, requiresAdmin: true }
                },
                {
                    path: '/alumnos/alumnocrear',
                    name: 'alumnocrear',
                    component: () => import('@/views/uikit/alumnos/alumnoCrear.vue'),
                    meta: { requiresAuth: true, requiresAdmin: true }
                },
                {
                    path: '/alumnos/alumnoVerTodos',
                    name: 'alumnovertodos',
                    component: () => import('@/views/uikit/alumnos/alumnoVerTodos.vue'),
                    meta: { requiresAuth: true, requiresAdmin: true }
                },
                //_______________________________
                //REPORTES
                {
                    path: '/uikit/accionesultima',
                    name: 'accionesultima',
                    component: () => import('@/views/uikit/reportes/AccionesUltima.vue'),
                    meta: { requiresAuth: true, requiresAdmin: true }
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ]
});

// **Protección de rutas con `beforeEach`**
router.beforeEach(async (to, from, next) => {
    const isAuth = isAuthenticated();
    const userRole = getUserRole();

    // 🔹 Permitir siempre acceder a login y no redirigir automáticamente
    if (to.name === 'login') {
        return next();
    }

    // 🔹 Si la ruta requiere autenticación y el usuario NO está autenticado
    if (to.meta.requiresAuth && !isAuth) {
        return next('/');
    }

    // 🔹 Si la ruta requiere ser admin y el usuario no es admin
    if (to.meta.requiresAdmin && userRole !== 'admin') {
        return next('/dashboard');
    }

    next();
});


export default router;
