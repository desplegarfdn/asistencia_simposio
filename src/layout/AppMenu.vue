<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const role = localStorage.getItem('user_role') || 'capturista'; // Obtiene el rol del usuario

const model = ref([
    {
        label: 'Principal',
        items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
    },
    {
        label: 'Apartados',
        items: [
            {
                label: 'Asistencia',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Registar Entrada',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/asistencia/entrada'
                    },
                    {
                        label: 'Registrar Salida',
                        icon: 'pi pi-fw pi-file-edit',
                        to: '/asistencia/salida'
                    }
                ]
            },
            ...(role === 'admin'
                ? [
                      // Solo mostrar si el usuario es admin
                      {
                          label: 'Usuarios',
                          icon: 'pi pi-fw pi-user',
                          items: [
                              { label: 'Buscar Usuario', icon: 'pi pi-fw pi-search', to: '/usuario/usuariobuscar' },
                              { label: 'Agregar Usuario', icon: 'pi pi-fw pi-user-plus', to: '/usuario/usuariocrear' }, // Usuario con "+" (Agregar)
                              { label: 'Editar Usuario', icon: 'pi pi-fw pi-user-edit', to: '/usuario/usuarioeditar' }, // Usuario con lápiz (Editar)
                              { label: 'Eliminar Usuario', icon: 'pi pi-fw pi-user-minus', to: '/usuario/usuarioeliminar' } // Usuario con "-" (Eliminar)
                          ]
                      },
                      {
                          label: 'Maestros',
                          icon: 'pi pi-fw pi-users',
                          items: [
                              { label: 'Buscar Maestro', icon: 'pi pi-fw pi-search', to: '/maestros/maestrobuscar' },
                              { label: 'Ver Maestros', icon: 'pi pi-fw pi-search', to: '/maestros/maestroVerTodos' }, // Usuario con "-" (Eliminar)
                              { label: 'Agregar Maestro', icon: 'pi pi-fw pi-user-plus', to: '/maestros/maestrocrear' }, // Usuario con "+" (Agregar)
                          ]
                      },
                      {
                          label: 'Alumnos',
                          icon: 'pi pi-fw pi-users',
                          items: [
                              { label: 'Buscar Alumno', icon: 'pi pi-fw pi-search', to: '/alumnos/alumnobuscar' },
                              { label: 'Ver Alumnos', icon: 'pi pi-fw pi-search', to: '/alumnos/alumnoVerTodos' }, // Usuario con "-" (Eliminar)
                              { label: 'Agregar Alumno', icon: 'pi pi-fw pi-user-plus', to: '/alumnos/alumnocrear' }, // Usuario con "+" (Agregar)
                          ]
                      },
                      {
                          label: 'Resportes',
                          icon: 'pi pi-fw pi-history',
                          items: [{ label: 'Ver Acciones', icon: 'pi pi-fw pi-eye', to: '/uikit/accionesultima' }]
                      }
                  ]
                : [])
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model">
            <app-menu-item v-if="!item.separator" :item="item" :index="i" :key="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator" :key="'separator-' + i"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped>
// Clase para íconos naranjas cuando está seleccionado
.icon-orange {
    color: orange;
}
</style>
