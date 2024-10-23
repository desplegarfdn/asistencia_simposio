
<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Principal',
        items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/', selected: false}]
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
      <template v-for="(item, i) in model" :key="item.label">
        <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
        <li v-if="item.separator" class="menu-separator"></li>
      </template>
      
    </ul>
  </template>
  
  <style lang="scss" scoped>
  // Clase para íconos naranjas cuando está seleccionado
  .icon-orange {
    color: orange;
  }
  </style>


