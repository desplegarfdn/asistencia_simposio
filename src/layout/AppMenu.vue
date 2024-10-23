
<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Principal',
        items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/dashboard', selected: false}]
    },
    {
        label: 'Apartados',
        items: [
            { 
                label: 'Encuestas',
                icon: 'pi pi-fw pi-briefcase',  
                items: [
                    {
                        label: 'Crear Encuesta',
                        icon: 'pi pi-fw pi-file-edit',
                        selected: false,
                        to: '/uikit/encuestas'
                    }
                ]
            },
        ]
    },
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


