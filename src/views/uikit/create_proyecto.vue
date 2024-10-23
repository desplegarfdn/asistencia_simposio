<script setup>
import logoAyuntamiento from '@/assets/logo_ayuntamiento.png';
import logoBienestar from '@/assets/logo_bienestar.png';
import axios from 'axios'; // Importar axios para hacer peticiones HTTP
import { useToast } from 'primevue/usetoast'; // Importa correctamente el hook useToast
import { ref } from 'vue';
// import { Secciones } from '@/service/CustomerService';

// Inicializar el servicio de Toast
const toast = ref(null);
// Token JWT almacenado
const token = ref(localStorage.getItem('access_token')); // JWT
console.log('Token JWT enviado:', token.value);

// Datos del formulario
const formData = ref({
    date: null,
    time: null,
    folioEntrevista: null,
    folioEntrevistador: null,
    seccion: null,
    colonia: null,
    apellidoPaterno: null,
    apellidoMaterno: null,
    nombreEntrevistado: null,
    numeroTelefono: null,
    nacionalidad: null,
    radioValue: null,
    edad: null,
    direccion: null,
    dropdownValue: null,
    luzRecibo: null,
    razonLuz: null,
    aguaRecibo: null,
    razonAgua: null,
    viviendaTipo: [],
    viviendaCuentaCon: [],
    mejoramientoApoyo: [],
    comercio: null,
    tipoComercio: null,
    suministroAgua: [],
    totalHabitantes: null,
    mujeres: null,
    hombres: null,
    grupoEtnico: [],
    lenguaIndigena: null,
    mayoresEdad: null,
    menoresEdad: null,
    programaSocial: [],
    comite: null,
    comiteCargo: null,
    comiteNombre: null,
    infraestructura: [],
    otrosInfraestructura: null,
    seguroColonia: null,
    porqueInsegura: null,
    inseguridadTipo: [],
    vecesBasura: null,
    diasAgua: null,
    calidadAgua: null,
    problemasContaminacion: [],
    otrosContaminacion: null,
    organizacionSocial: null,
    organizacionCual: null,
    redSocial: [],
    noticias: null,
    trabajoPresidente: null,
    atenderProblema: null,
    observaciones: null
});

const radioValue = ref(null);
const dropdownValues = ref([
    { name: 'Urbano', code: 'URB' },
    { name: 'Rural', code: 'RUR' }
]);
const dropdownValue = ref(null);

const viviendaOptions = ref([
    { name: 'Propia' },
    { name: 'Rentada' },
    { name: 'Prestada' },
    { name: 'Ninguna' }
]);

const viviendaCuentaOptions = ref([
    { name: 'Proceso de Regularización' },
    { name: 'Contrato de Compra/Venta' },
    { name: 'Escritura Pública' },
    { name: 'Terreno Ejidal' },
    { name: 'Ninguna' }
]);

const mejoramientoOptions = ref([
    { name: 'CONAVI' },
    { name: 'Piso Firme' },
    { name: 'Techo' },
    { name: 'Ninguna' }
]);

const suministroAguaOptions = ref([
    { name: 'Agua de Pozo' },
    { name: 'Agua Reciclada' },
    { name: 'Pozo Profundo' },
    { name: 'COAPATAP' },
    { name: 'Ninguna' }
]);

// Variables para los radio buttons y campos de texto
const luzRecibo = ref(null);
const razonLuz = ref(null);

const aguaRecibo = ref(null);
const razonAgua = ref(null);

const viviendaTipo = ref([]);
const viviendaCuentaCon = ref([]);

const mejoramientoApoyo = ref([]);

const comercio = ref(null);
const tipoComercio = ref(null);

const suministroAgua = ref([]);

const totalHabitantes = ref(null);
const mujeres = ref(null);
const hombres = ref(null);

const grupoEtnico = ref([]);
const lenguaIndigena = ref(null);

const mayoresEdad = ref(null);
const menoresEdad = ref(null);

const programaSocial = ref([]);

// Opciones para el multiselect de grupo étnico
const grupoEtnicoOptions = ref([
    { name: 'Mam' },
    { name: 'Zoque' },
    { name: 'Tzeltal' },
    { name: 'Desconozco' },
    // { name: 'Ninguno' }
]);

// Opciones para el multiselect de programa social
const programaSocialOptions = ref([
    { name: 'Becas Benito Juárez' },
    { name: 'Jóvenes Escribiendo el Futuro' },
    { name: 'Jóvenes Construyendo el Futuro' },
    { name: 'Adultos Mayores' },
    { name: 'Personas con Capacidades Diferentes' },
    { name: 'Ninguno' }
]);

const comite = ref(null);
const comiteCargo = ref(null);
const comiteNombre = ref(null);

const infraestructura = ref([]);
const otrosInfraestructura = ref(null);

const seguroColonia = ref(null);
const porqueInsegura = ref(null);
const inseguridadTipo = ref([]);

const vecesBasura = ref(null);
const diasAgua = ref(null);

const calidadAgua = ref(null);
const problemasContaminacion = ref([]);
const otrosContaminacion = ref(null);

const organizacionSocial = ref(null);
const organizacionCual = ref(null);

const redSocial = ref([]);
const noticias = ref(null);

const observaciones = ref(null);

// Opciones para las preguntas de selección múltiple
const infraestructuraOptions = ref([
    { name: 'Drenaje' },
    { name: 'Agua potable' },
    { name: 'Alumbrado público' },
    { name: 'Pavimentación de calles' },
    { name: 'Alcantarillado pluvial' },
    { name: 'Parques infantiles' },
    { name: 'Áreas deportivas' },
    { name: 'Otros' }
]);

const inseguridadOptions = ref([
    { name: 'Asaltos' },
    { name: 'Robos' },
    { name: 'Vandalismo' },
    { name: 'Narcotráfico' },
    { name: 'Homicidio' },
    { name: 'Secuestro' },
    { name: 'Drogadicción' }
]);

const calidadAguaOptions = ref([
    { name: 'Excelente' },
    { name: 'Bueno' },
    { name: 'Regular' },
    { name: 'Malo' }
]);

const contaminacionOptions = ref([
    { name: 'Basura' },
    { name: 'Ruidos' },
    { name: 'Olores fétidos' },
    { name: 'Agua de drenaje' },
    { name: 'Otros' }
]);

const redSocialOptions = ref([
    { name: 'Facebook' },
    { name: 'Instagram' },
    { name: 'Threads' },
    { name: 'TikTok' },
    { name: 'X (Twitter)' },
    { name: 'WhatsApp' },
    { name: 'Ninguna' }
]);

const trabajoRealizadoOptions = ref([
    { name: 'De acuerdo' },
    { name: 'Ni de acuerdo ni en desacuerdo' },
    { name: 'En desacuerdo' },
    { name: 'No sabe / No contestó' }
]);

const problemasOptions = ref([
    { name: 'Seguridad' },
    { name: 'Salud' },
    { name: 'Economía' },
    { name: 'Educación' },
    { name: 'Programas sociales' },
    { name: 'Derechos de las mujeres' },
    { name: 'Obras e infraestructuras' },
    { name: 'Medio ambiente' },
    { name: 'Otro' },
    { name: 'No sabe / No contestó' }
]);

function onUpload() {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
}

// Función para formatear las preguntas y respuestas en el formato requerido por la API
function formatearRespuestas() {
  const respuestas = [];

  // Pregunta 1
  respuestas.push({
    pregunta: '¿Cuenta con recibo de luz eléctrica?',
    respuesta: formData.value.luzRecibo
  });
  if (formData.value.luzRecibo === 'No') {
    respuestas.push({
      pregunta: '¿Por qué no tiene recibo de luz?',
      respuesta: formData.value.razonLuz || 'No especificado'
    });
  } else {
    respuestas.push({
      pregunta: '¿Por qué no tiene recibo de luz?',
      respuesta: null
    });
  }

  // Pregunta 2
  respuestas.push({
    pregunta: '¿Cuenta con recibo de agua potable?',
    respuesta: formData.value.aguaRecibo
  });
  if (formData.value.aguaRecibo === 'No') {
    respuestas.push({
      pregunta: '¿Por qué no tiene recibo de agua?',
      respuesta: formData.value.razonAgua || 'No especificado'
    });
  } else {
    respuestas.push({
      pregunta: '¿Por qué no tiene recibo de agua?',
      respuesta: null
    });
  }

  // Pregunta 3
  respuestas.push({
    pregunta: 'La vivienda es',
    respuesta: formData.value.viviendaTipo?.name || 'No especificado'  // Validación para evitar acceso a `undefined`
  });

  // Pregunta 4
  respuestas.push({
    pregunta: 'La vivienda cuenta con',
    respuesta: Array.isArray(formData.value.viviendaCuentaCon)
      ? formData.value.viviendaCuentaCon.map(item => item.name).join(', ')
      : 'No especificado'
  });

  // Pregunta 5
  respuestas.push({
    pregunta: 'Apoyo de mejoramiento de vivienda',
    respuesta: Array.isArray(formData.value.mejoramientoApoyo)
      ? formData.value.mejoramientoApoyo.map(item => item.name).join(', ')
      : 'No especificado'
  });

  // Pregunta 6
  respuestas.push({
    pregunta: 'Comercio en la vivienda',
    respuesta: formData.value.comercio
  });
  if (formData.value.comercio === 'Sí') {
    respuestas.push({
      pregunta: 'Tipo de comercio',
      respuesta: formData.value.tipoComercio || 'No especificado'
    });
  } else {
    respuestas.push({
      pregunta: 'Tipo de comercio',
      respuesta: null
    });
  }

  // Pregunta 7
  respuestas.push({
    pregunta: 'Suministro de agua',
    respuesta: Array.isArray(formData.value.suministroAgua)
      ? formData.value.suministroAgua.map(item => item.name).join(', ')
      : 'No especificado'
  });

  // Pregunta 8
  respuestas.push({ pregunta: 'Total de habitantes en el hogar', respuesta: formData.value.totalHabitantes || 'No especificado' });
  respuestas.push({ pregunta: 'Cantidad de mujeres', respuesta: formData.value.mujeres || 'No especificado' });
  respuestas.push({ pregunta: 'Cantidad de hombres', respuesta: formData.value.hombres || 'No especificado' });

  // Pregunta 9
  respuestas.push({
    pregunta: '¿Pertenece a algún grupo étnico?',
    respuesta: Array.isArray(formData.value.grupoEtnico)
      ? formData.value.grupoEtnico.map(item => item.name).join(', ')
      : 'No especificado'
  });

  // Pregunta 10
  respuestas.push({
    pregunta: '¿Habla alguna lengua indígena?',
    respuesta: formData.value.lenguaIndigena || 'No especificado'
  });

  // Pregunta 11
  respuestas.push({
    pregunta: '¿Cuántas personas son mayores de edad?',
    respuesta: formData.value.mayoresEdad || 'No especificado'
  });

  // Pregunta 12
  respuestas.push({
    pregunta: '¿Cuántas personas son menores de edad?',
    respuesta: formData.value.menoresEdad || 'No especificado'
  });

  // Pregunta 13
  respuestas.push({
    pregunta: '¿Reciben algún programa social?',
    respuesta: Array.isArray(formData.value.programaSocial)
      ? formData.value.programaSocial.map(item => item.name).join(', ')
      : 'No especificado'
  });

  // Pregunta 14
  respuestas.push({
    pregunta: '¿Identifica a los integrantes del comité de su colonia?',
    respuesta: formData.value.comite
  });
  if (formData.value.comite === 'Sí') {
    respuestas.push({
      pregunta: 'Cargo del integrante del comité',
      respuesta: formData.value.comiteCargo || 'No especificado'
    });
    respuestas.push({
      pregunta: 'Nombre del integrante del comité',
      respuesta: formData.value.comiteNombre || 'No especificado'
    });
  } else {
    respuestas.push({ pregunta: 'Cargo del integrante del comité', respuesta: null });
    respuestas.push({ pregunta: 'Nombre del integrante del comité', respuesta: null });
  }

  // Pregunta 15
  respuestas.push({
    pregunta: '¿Cuáles son las principales necesidades en infraestructura?',
    respuesta: Array.isArray(formData.value.infraestructura)
      ? formData.value.infraestructura.map(item => item.name).join(', ')
      : 'No especificado'
  });

  // Pregunta 15 - Otros
  if (Array.isArray(formData.value.infraestructura) && formData.value.infraestructura.some(option => option.name === 'Otros')) {
    respuestas.push({
      pregunta: 'Otras necesidades en infraestructura',
      respuesta: formData.value.otrosInfraestructura || 'No especificado'
    });
  } else {
    respuestas.push({ pregunta: 'Otras necesidades en infraestructura', respuesta: null });
  }

  // Pregunta 16
  respuestas.push({
    pregunta: '¿Considera que su colonia es segura?',
    respuesta: formData.value.seguroColonia || 'No especificado'
  });

  // Pregunta 16 - Por qué
  if (formData.value.porqueInsegura) {
    respuestas.push({
      pregunta: '¿Por qué considera eso?',
      respuesta: formData.value.porqueInsegura || 'No especificado'
    });
  }

  // Pregunta 17
  if (formData.value.seguroColonia === 'No') {
    respuestas.push({
      pregunta: '¿Qué tipo de inseguridad percibe?',
      respuesta: Array.isArray(formData.value.inseguridadTipo)
        ? formData.value.inseguridadTipo.map(item => item.name).join(', ')
        : 'No especificado'
    });
  } else {
    respuestas.push({
      pregunta: '¿Qué tipo de inseguridad percibe?',
      respuesta: null
    });
  }

  // Pregunta 18
  respuestas.push({
    pregunta: '¿Cuántas veces a la semana pasa el camión recolector de la basura?',
    respuesta: formData.value.vecesBasura || 'No especificado'
  });

  // Pregunta 19
  respuestas.push({
    pregunta: '¿Cuántos días a la semana llega el servicio de agua potable?',
    respuesta: formData.value.diasAgua || 'No especificado'
  });

  // Pregunta 20
  respuestas.push({
    pregunta: '¿Considera que el servicio de agua potable es?',
    respuesta: formData.value.calidadAgua?.name || 'No especificado'
  });

  // Pregunta 21
  respuestas.push({
    pregunta: '¿Qué problemas de contaminación ha detectado?',
    respuesta: Array.isArray(formData.value.problemasContaminacion)
      ? formData.value.problemasContaminacion.map(item => item.name).join(', ')
      : 'No especificado'
  });

  // Pregunta 21 - Otros
  if (Array.isArray(formData.value.problemasContaminacion) && formData.value.problemasContaminacion.some(option => option.name === 'Otros')) {
    respuestas.push({
      pregunta: 'Otros problemas de contaminación',
      respuesta: formData.value.otrosContaminacion || 'No especificado'
    });
  } else {
    respuestas.push({ pregunta: 'Otros problemas de contaminación', respuesta: null });
  }

  // Pregunta 22
  respuestas.push({
    pregunta: '¿Identifica alguna organización social en su colonia?',
    respuesta: formData.value.organizacionSocial || 'No especificado'
  });
  if (formData.value.organizacionSocial === 'Sí') {
    respuestas.push({
      pregunta: '¿Cuál es la organización social?',
      respuesta: formData.value.organizacionCual || 'No especificado'
    });
  } else {
    respuestas.push({ pregunta: '¿Cuál es la organización social?', respuesta: null });
  }

  // Pregunta 23
  respuestas.push({
    pregunta: '¿Maneja algún tipo de red social?',
    respuesta: Array.isArray(formData.value.redSocial)
      ? formData.value.redSocial.map(item => item.name).join(', ')
      : 'No especificado'
  });

  // Pregunta 24
  respuestas.push({
    pregunta: '¿Cómo se entera de las noticias?',
    respuesta: formData.value.noticias || 'No especificado'
  });

  // Pregunta 25
  respuestas.push({
    pregunta: '¿Está de acuerdo o en desacuerdo con el trabajo realizado por el presidente?',
    respuesta: formData.value.trabajoPresidente?.name || 'No especificado'
  });

  // Pregunta 26
  respuestas.push({
    pregunta: '¿Qué problema debería atender más rápidamente en el municipio el presidente?',
    respuesta: formData.value.atenderProblema?.name || 'No especificado'
  });

  // Observaciones
  respuestas.push({
    pregunta: 'Observaciones',
    respuesta: formData.value.observaciones || 'No especificado'
  });

  return respuestas;
}


async function guardarEntrevista() {
  const respuestas = formatearRespuestas();  // Obtener las respuestas formateadas

  // Crear el payload que vamos a enviar
  const payload = {
    folio_entrevista: formData.value.folioEntrevista,
    cupo_entrevistador: formData.value.folioEntrevistador,
    seccion: formData.value.seccion,
    colonia: formData.value.colonia,
    nombre_encuestado: formData.value.nombreEntrevistado,
    apellido_paterno: formData.value.apellidoPaterno,
    apellido_materno: formData.value.apellidoMaterno,
    numero_telefono: formData.value.numeroTelefono,
    nacionalidad: formData.value.nacionalidad,
    sexo: formData.value.sexo,
    edad: formData.value.edad ? parseInt(formData.value.edad, 10) : null,  // Validar edad antes de convertirla
    direccion: formData.value.direccion,
    tipo_asentamiento: formData.value.tipoAsentamiento?.name || 'No especificado',  // Validar que existe
    fecha_hora: new Date().toISOString(),  // Generar la fecha y hora actual en formato ISO
    respuestas: respuestas  // Insertar las respuestas en el campo correcto
  };

  // Mostrar el JSON en la consola
  console.log("Payload enviado:", JSON.stringify(payload, null, 2));

  if (!token.value) {
    console.error('No hay token disponible. No se puede enviar la solicitud.');
    toast.value.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No hay token de autenticación disponible. Por favor, inicie sesión.',
      life: 3000
    });
    return;
  }

  try {
    const url = 'https://encuestas-municipio.onrender.com/encuestas/create';
    const response = await axios.post(url, payload, {
      headers: {
        'Authorization': `Bearer ${token.value}`,  // Usar el token JWT
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      // Mostrar notificación de éxito
      toast.value.add({
        severity: 'success',
        summary: '¡Éxito!',
        detail: 'Entrevista guardada correctamente.',
        life: 3000
      });
      resetForm();
    } else {
      // Manejo adicional si el código de estado no es 200
      console.error('Respuesta inesperada al guardar la entrevista:', response);
      toast.value.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La entrevista se guardó, pero hubo una respuesta inesperada.',
        life: 3000
      });
    }
  } catch (error) {
    console.error('Error al guardar la entrevista:', error.response ? error.response.data : error.message);

    // Mostrar notificación de error con detalles
    toast.value.add({
      severity: 'error',
      summary: 'Error',
      detail: `Hubo un problema al guardar la entrevista: ${error.response?.data?.detail || error.message}`,
      life: 3000
    });
  }
}

function resetForm() {
    formData.value = {
        date: null,
        time: null,
        folioEntrevista: null,
        folioEntrevistador: null,
        seccion: null,
        colonia: null,
        apellidoPaterno: null,
        apellidoMaterno: null,
        nombreEntrevistado: null,
        numeroTelefono: null,
        nacionalidad: null,
        radioValue: null,
        edad: null,
        direccion: null,
        dropdownValue: null,
        luzRecibo: null,
        razonLuz: null,
        aguaRecibo: null,
        razonAgua: null,
        viviendaTipo: [],
        viviendaCuentaCon: [],
        mejoramientoApoyo: [],
        comercio: null,
        tipoComercio: null,
        suministroAgua: [],
        totalHabitantes: null,
        mujeres: null,
        hombres: null,
        grupoEtnico: [],
        lenguaIndigena: null,
        mayoresEdad: null,
        menoresEdad: null,
        programaSocial: [],
        comite: null,
        comiteCargo: null,
        comiteNombre: null,
        infraestructura: [],
        otrosInfraestructura: null,
        seguroColonia: null,
        porqueInsegura: null,
        inseguridadTipo: [],
        vecesBasura: null,
        diasAgua: null,
        calidadAgua: null,
        problemasContaminacion: [],
        otrosContaminacion: null,
        organizacionSocial: null,
        organizacionCual: null,
        redSocial: [],
        noticias: null,
        trabajoPresidente: null,
        atenderProblema: null,
        observaciones: null
    };
}
// const colonias = ref([]);
// const autoFilteredColonias = ref([]);

// onMounted(() => {
//     colonias.value = Secciones.getData().map(seccion => seccion.Nombre_colonia);
// });


// function searchColonia(event) {
//     setTimeout(() => {
//         if (!event.query.trim().length) {
//             autoFilteredColonias.value = [...colonias.value];
//         } else {
//             autoFilteredColonias.value = colonias.value.filter((colonia) => {
//                 return colonia.toLowerCase().startsWith(event.query.toLowerCase());
//             });
//         }
//     }, 250);
// }

</script>

<template>
    <Fluid>
        <div class="card flex flex-col gap-4 w-full">
            <div class="flex items-center justify-center gap-8 mb-8">
                <!-- Usa las variables que contienen las rutas importadas -->
                <img :src="logoAyuntamiento" alt="Logo Ayuntamiento" class="w-48 h-auto">
                <div class="text-center">
                    <p class="text-xl font-bold">CÉDULA DE LEVANTAMIENTO DE INFORMACIÓN</p>
                    <p class="text-sm">H. AYUNTAMIENTO DE TAPACHULA 2024-2027</p>
                    <p class="text-sm">SECRETARÍA DE BIENESTAR MUNICIPAL</p>
                    <p class="text-sm">POR FAVOR LLENE TODA LA ENCUESTA, COLOCANDO LOS DATOS SOLICITADOS:</p>
                </div>
                <img :src="logoBienestar" alt="Logo Bienestar" class="w-48 h-auto">
            </div>
        </div>

        <div class="card flex flex-col gap-4 w-full">
            <div class="font-semibold text-xl">Información general</div>

            <!-- Primera fila: Fecha, Hora, Folio -->
            <div class="flex flex-col md:flex-row gap-4">
                <!-- Selector de fecha -->
              <div class="md:w-1/4">
                <label for="fecha">Fecha:</label>
                <InputText
                  id="fecha"
                  type="date"
                  v-model="formData.date"
                />
              </div>
                <!-- Selector de hora -->
                <div class="md:w-1/4">
                    <label for="appointment-time" class="font-semibold text-lg">Hora</label>
                    <input id="appointment-time" type="time" v-model="formData.time" class="form-control w-full p-2 border rounded-md" />
                </div>

                <!-- Folio de entrevista -->
                <div class="md:w-1/4">
                    <label for="folioEntrevista" class="font-semibold text-lg">Folio de entrevista</label>
                    <InputText id="folioEntrevista" v-model="formData.folioEntrevista" type="text" class="w-full" />
                </div>

                <!-- Folio de entrevistador -->
                <div class="md:w-1/4">
                    <label for="folioEntrevistador" class="font-semibold text-lg">CUPO del entrevistador</label>
                    <InputText id="folioEntrevistador" v-model="formData.folioEntrevistador" type="text" class="w-full" />
                </div>

                <!-- Sección de la entrevista -->
                <div class="md:w-1/4">
                    <label for="seccion" class="font-semibold text-lg">Sección</label>
                    <InputText id="seccion" v-model="formData.seccion" type="text" class="w-full" />
                </div>

                <!-- <div class="font-semibold text-xl">AutoComplete</div>
                <AutoComplete
                    v-model="formData.seccion"
                    :suggestions="autoFilteredValue"
                    optionLabel="Seccion"
                    placeholder="Sección"
                    dropdown
                    multiple
                    display="chip"
                    @complete="searchSeccion($event)"
                /> -->

                <!-- Colonia -->
                <div class="md:w-1/4">
                    <label for="colonia" class="font-semibold text-lg">Colonia</label>
                    <InputText id="colonia" v-model="formData.colonia" type="text" class="w-full" />
                </div>

                <!-- <div class="md:w-1/4">
                    <label for="colonia" class="font-semibold text-lg">Colonia</label>
                    <AutoComplete
                        v-model="formData.colonia"
                        :suggestions="autoFilteredColonias"
                        placeholder="Colonia"
                        dropdown
                        @complete="searchColonia($event)"
                    />
                </div> -->


            </div>

            <!-- Segunda fila: Apellido paterno, Apellido materno, Nombre(s) -->
            <div class="flex flex-col md:flex-row gap-4">
                <div class="md:w-1/3">
                    <label for="apellidoPaterno" class="font-semibold text-lg">Apellido paterno</label>
                    <InputText id="apellidoPaterno" v-model="formData.apellidoPaterno" type="text" class="w-full" />
                </div>
                <div class="md:w-1/3">
                    <label for="apellidoMaterno" class="font-semibold text-lg">Apellido materno</label>
                    <InputText id="apellidoMaterno" v-model="formData.apellidoMaterno" type="text" class="w-full" />
                </div>
                <div class="md:w-1/3">
                    <label for="nombreEntrevistado" class="font-semibold text-lg">Nombre(s)</label>
                    <InputText id="nombreEntrevistado" v-model="formData.nombreEntrevistado" type="text" class="w-full" />
                </div>
            </div>

            <!-- Tercera fila: Número de teléfono, Nacionalidad, Sexo, Edad -->
            <div class="flex flex-col md:flex-row gap-4">
                <!-- Número de teléfono -->
                <div class="md:w-1/4">
                    <label for="numeroTelefono" class="font-semibold text-lg">Número de teléfono</label>
                    <InputText id="numeroTelefono" v-model="formData.numeroTelefono" type="number" class="w-full" />
                </div>

                <!-- Nacionalidad -->
                <div class="md:w-1/4">
                    <label for="nacionalidad" class="font-semibold text-lg">Nacionalidad</label>
                    <InputText id="nacionalidad" v-model="formData.nacionalidad" type="text" class="w-full" />
                </div>

                <!-- Sexo -->
                <div class="md:w-1/4">
                    <label class="font-semibold text-lg">Sexo</label>
                    <div class="flex gap-4">
                        <div class="flex items-center">
                            <RadioButton id="option1" name="sexo" value="Femenino" v-model="formData.sexo" />
                            <label for="option1" class="ml-2">Femenino</label>
                        </div>
                        <div class="flex items-center">
                            <RadioButton id="option2" name="sexo" value="Masculino" v-model="formData.sexo" />
                            <label for="option2" class="ml-2">Masculino</label>
                        </div>
                    </div>
                </div>

                <!-- Edad -->
                <div class="md:w-1/4">
                    <label for="edad" class="font-semibold text-lg">Edad</label>
                    <InputText id="edad" v-model="formData.edad" type="number" class="w-full" />
                </div>
            </div>

            <!-- Cuarta fila: Dirección y Tipo de asentamiento -->
            <div class="flex flex-col md:flex-row gap-4">
                <div class="md:w-3/4">
                    <label for="direccion" class="font-semibold text-lg">Dirección</label>
                    <InputText id="direccion" v-model="formData.direccion" type="text" class="w-full" />
                </div>
                <div class="md:w-1/4">
                    <label for="tipoAsentamiento" class="font-semibold text-lg">Tipo de asentamiento</label>
                    <Dropdown v-model="formData.tipoAsentamiento" :options="dropdownValues" optionLabel="name" placeholder="Seleccione" class="w-full"/>
                </div>
            </div>
        </div>

        <div class="card flex flex-col gap-4 w-full">
            <div class="font-semibold text-xl">Datos de la vivienda</div>
            <!-- Primera fila: Pregunta 1 -->
            <div class="flex flex-col md:flex-row items-center gap-2">
                <label class="md:w-1/3 font-semibold text-lg">1.- ¿Cuenta con recibo de luz eléctrica?</label>
                <div class="flex items-center md:w-1/3 gap-2">
                    <RadioButton id="luzSi" name="luz" value="Sí" v-model="formData.luzRecibo" />
                    <label for="luzSi" class="ml-2">Sí</label>
                    <RadioButton id="luzNo" name="luz" value="No" v-model="formData.luzRecibo" />
                    <label for="luzNo" class="ml-2">No</label>
                </div>
                <!-- Mostrar campo "Por qué" solo si seleccionan "No" -->
                <div class="md:w-1/3 mt-2 md:mt-0" v-if="formData.luzRecibo === 'No'">
                    <InputText placeholder="¿Por qué?" v-model="formData.razonLuz" class="w-full p-2 border rounded-md" />
                </div>
            </div>

            <!-- Segunda fila: Pregunta 2 -->
            <div class="flex flex-col md:flex-row items-center gap-2 mt-4">
                <label class="md:w-1/3 font-semibold text-lg">2.- ¿Cuenta con recibo de agua potable?</label>
                <div class="flex items-center md:w-1/3 gap-2">
                    <RadioButton id="aguaSi" name="agua" value="Sí" v-model="formData.aguaRecibo" />
                    <label for="aguaSi" class="ml-2">Sí</label>
                    <RadioButton id="aguaNo" name="agua" value="No" v-model="formData.aguaRecibo" />
                    <label for="aguaNo" class="ml-2">No</label>
                </div>
                <!-- Mostrar campo "Por qué" solo si seleccionan "No" -->
                <div class="md:w-1/3 mt-2 md:mt-0" v-if="formData.aguaRecibo === 'No'">
                    <InputText placeholder="¿Por qué?" v-model="formData.razonAgua" class="w-full p-2 border rounded-md" />
                </div>
            </div>


            <!-- Tercera fila: Pregunta 3, 4 y 5 -->
            <div class="flex flex-col md:flex-row gap-2 mt-4">
                <!-- Pregunta 3: Selección única -->
                <div class="md:w-1/3">
                    <label class="font-semibold text-lg">3.- La vivienda es:</label>
                    <Dropdown v-model="formData.viviendaTipo" :options="viviendaOptions" optionLabel="name" placeholder="Seleccione una opción" class="w-full" />
                </div>

                <!-- Pregunta 4 -->
                <div class="md:w-1/3">
                    <label class="font-semibold text-lg">4.- La vivienda cuenta con:</label>
                    <MultiSelect v-model="formData.viviendaCuentaCon" :options="viviendaCuentaOptions" optionLabel="name" placeholder="Seleccione opciones" class="w-full" />
                </div>

                <!-- Pregunta 5 -->
                <div class="md:w-1/3">
                    <label class="font-semibold text-lg">5.- ¿Apoyo de mejoramiento de vivienda?</label>
                    <MultiSelect v-model="formData.mejoramientoApoyo" :options="mejoramientoOptions" optionLabel="name" placeholder="Seleccione opciones" class="w-full" />
                </div>
            </div>

            <!-- Cuarta fila: Pregunta 6 y 7 -->
            <div class="flex flex-col md:flex-row gap-2 mt-4">
                <!-- Pregunta 6 -->
                <div class="md:w-1/2">
                    <label class="font-semibold text-lg">6.- ¿Su vivienda cuenta con algún tipo de comercio?</label>
                    <div class="flex items-center gap-2">
                        <RadioButton id="comercioSi" name="comercio" value="Sí" v-model="formData.comercio" />
                        <label for="comercioSi" class="ml-2">Sí</label>
                        <RadioButton id="comercioNo" name="comercio" value="No" v-model="formData.comercio" />
                        <label for="comercioNo" class="ml-2">No</label>
                    </div>
                    <!-- Mostrar el campo de tipo de comercio solo si selecciona 'Sí' -->
                    <InputText v-if="formData.comercio === 'Sí'" placeholder="¿Qué tipo?" v-model="formData.tipoComercio" class="w-full p-2 border rounded-md mt-2" />
                </div>

                <!-- Pregunta 7 -->
                <div class="md:w-1/2">
                    <label class="font-semibold text-lg">7.- El suministro de agua lo obtienen de:</label>
                    <MultiSelect v-model="formData.suministroAgua" :options="suministroAguaOptions" optionLabel="name" placeholder="Seleccione opciones" class="w-full" />
                </div>
            </div>
        </div>

        <div class="card flex flex-col gap-4 w-full">
            <div class="font-semibold text-xl">Datos de los habitantes de la vivienda</div>
            <!-- Primera fila: Pregunta 8 -->
            <div class="flex flex-col md:flex-row gap-2 mt-4">
                <label class="md:w-1/4 font-semibold text-lg">8.- ¿Cuántas personas viven en su hogar?</label>
                <div class="md:w-1/4">
                    <InputText placeholder="Total de habitantes" v-model="formData.totalHabitantes" class="w-full p-2 border rounded-md" />
                </div>
                <div class="md:w-1/4">
                    <InputText placeholder="Mujeres" v-model="formData.mujeres" class="w-full p-2 border rounded-md" />
                </div>
                <div class="md:w-1/4">
                    <InputText placeholder="Hombres" v-model="formData.hombres" class="w-full p-2 border rounded-md" />
                </div>
            </div>


            <!-- Segunda fila: Pregunta 9 y 10 -->
            <div class="flex flex-col md:flex-row gap-2 mt-4">
                <div class="md:w-1/2">
                    <label class="font-semibold text-lg">9.- ¿Pertenece a algún grupo étnico?, ¿Cuál?</label>
                    <MultiSelect v-model="formData.grupoEtnico" :options="grupoEtnicoOptions" optionLabel="name" placeholder="Seleccione opciones" class="w-full" />
                </div>
                <div class="md:w-1/2">
                    <label class="font-semibold text-lg">10.- ¿Habla alguna lengua indígena?, ¿Cuál?</label>
                    <InputText placeholder="Especifique" v-model="formData.lenguaIndigena" class="w-full p-2 border rounded-md" />
                </div>
            </div>

            <!-- Tercera fila: Pregunta 11, 12, 13 -->
            <div class="flex flex-col md:flex-row gap-2 mt-4">
                <div class="md:w-1/3">
                    <label class="font-semibold text-lg">11.- ¿Cuántas personas son mayores de edad?</label>
                    <InputText placeholder="Número" v-model="formData.mayoresEdad" class="w-full p-2 border rounded-md" />
                </div>
                <div class="md:w-1/3">
                    <label class="font-semibold text-lg">12.- ¿Cuántas personas son menores de edad?</label>
                    <InputText placeholder="Número" v-model="formData.menoresEdad" class="w-full p-2 border rounded-md" />
                </div>
                <div class="md:w-1/3">
                    <label class="font-semibold text-lg">13.- ¿Reciben algún programa social?</label>
                    <MultiSelect v-model="formData.programaSocial" :options="programaSocialOptions" optionLabel="name" placeholder="Seleccione opciones" class="w-full" />
                </div>
            </div>
        </div>

        <div class="card flex flex-col gap-4 w-full">
            <div class="font-semibold text-xl">Datos de los habitantes de la vivienda</div>
            <!-- Primera fila: Pregunta 14 -->
            <div class="flex flex-col gap-2 mt-4">
                <label class="font-semibold text-lg">14.- ¿Identifica a los integrantes del comité de su colonia?</label>
                <div class="flex items-center gap-8">
                    <RadioButton id="comiteSi" name="comite" value="Sí" v-model="formData.comite" />
                    <label for="comiteSi" class="ml-2">Sí</label>
                    <RadioButton id="comiteNo" name="comite" value="No" v-model="formData.comite" />
                    <label for="comiteNo" class="ml-2">No</label>
                </div>

                <!-- Mostrar los campos adicionales si el usuario selecciona "Sí" -->
                <div v-if="formData.comite === 'Sí'" class="flex flex-col gap-2 mt-2">
                    <InputText placeholder="Cargo" v-model="formData.comiteCargo" class="w-full p-2 border rounded-md" />
                    <InputText placeholder="Nombre" v-model="formData.comiteNombre" class="w-full p-2 border rounded-md" />
                </div>
            </div>

            <!-- Pregunta 15 -->
            <div class="flex flex-col gap-2 mt-4">
                <label class="font-semibold text-lg">15.- ¿Cuáles son las principales necesidades en infraestructura?</label>
                <MultiSelect v-model="formData.infraestructura" :options="infraestructuraOptions" optionLabel="name" placeholder="Seleccione opciones" class="w-full" />

                <!-- Mostrar campo "Especifique" si selecciona "Otros" -->
                <div v-if="formData.infraestructura.some(option => option.name === 'Otros')" class="mt-2">
                    <InputText placeholder="Especifique cuáles" v-model="formData.otrosInfraestructura" class="w-full p-2 border rounded-md" />
                </div>
            </div>

            <!-- Tercera fila: Pregunta 16 -->
            <div class="flex flex-col gap-2 mt-4">
                <label class="font-semibold text-lg">16.- ¿Considera que su colonia es segura?</label>
                <div class="flex items-center gap-8">
                    <RadioButton id="seguroSi" name="seguro" value="Sí" v-model="formData.seguroColonia" />
                    <label for="seguroSi" class="ml-2">Sí</label>
                    <RadioButton id="seguroNo" name="seguro" value="No" v-model="formData.seguroColonia" />
                    <label for="seguroNo" class="ml-2">No</label>
                </div>
                <InputText placeholder="¿Por qué?" v-model="formData.porqueInsegura" class="w-full p-2 border rounded-md mt-2" />
            </div>

            <!-- Cuarta fila: Pregunta 17 -->
            <div class="flex flex-col gap-2 mt-4" v-if="formData.seguroColonia === 'No'">
                <label class="font-semibold text-lg">17.- Si respondió que no, ¿Qué tipo de inseguridad percibe?</label>
                <MultiSelect v-model="formData.inseguridadTipo" :options="inseguridadOptions" optionLabel="name" placeholder="Seleccione opciones" class="w-full" />
            </div>

            <!-- Cuarta fila: Pregunta 18 y 19 -->
            <div class="flex flex-col md:flex-row gap-4 mt-4 items-center">
                <!-- Pregunta 18 -->
                <div class="md:w-1/2 flex items-center gap-2">
                    <label class="font-semibold text-lg">18.- ¿Cuántas veces a la semana pasa el camión recolector de la basura?</label>
                    <InputText type="number" v-model="formData.vecesBasura" class="w-1/16 p-2 border rounded-md" />
                </div>

                <!-- Pregunta 19 -->
                <div class="md:w-1/2 flex items-center gap-2">
                    <label class="font-semibold text-lg">19.- ¿Cuántos días a la semana llega el servicio de agua potable?</label>
                    <InputText type="number" v-model="formData.diasAgua" class="w-1/6 p-2 border rounded-md" />
                </div>
            </div>

            <!-- Séptima fila: Pregunta 20 -->
            <div class="flex flex-col gap-2 mt-4">
                <label class="font-semibold text-lg">20.- ¿Considera que el servicio de agua potable es?</label>
                <Dropdown v-model="formData.calidadAgua" :options="calidadAguaOptions" optionLabel="name" placeholder="Seleccione una opción" class="w-full" />
            </div>

            <!-- Octava fila: Pregunta 21 -->
            <div class="flex flex-col gap-2 mt-4">
                <label class="font-semibold text-lg">21.- ¿Qué problemas de contaminación ha detectado?</label>
                <MultiSelect v-model="formData.problemasContaminacion" :options="contaminacionOptions" optionLabel="name" placeholder="Seleccione opciones" class="w-full" />

                <!-- Mostrar campo "Especifique" si selecciona "Otros" -->
                <div v-if="formData.problemasContaminacion.some(option => option.name === 'Otros')" class="mt-2">
                    <InputText placeholder="Especifique cuál" v-model="formData.otrosContaminacion" class="w-full p-2 border rounded-md" />
                </div>
            </div>

            <!-- Novena fila: Pregunta 22 -->
            <div class="flex flex-col gap-2 mt-4">
                <label class="font-semibold text-lg">22.- ¿Identifica alguna organización social en su colonia?</label>
                <div class="flex items-center gap-8">
                    <RadioButton id="organizacionSi" name="organizacion" value="Sí" v-model="formData.organizacionSocial" />
                    <label for="organizacionSi" class="ml-2">Sí</label>
                    <RadioButton id="organizacionNo" name="organizacion" value="No" v-model="formData.organizacionSocial" />
                    <label for="organizacionNo" class="ml-2">No</label>
                </div>
                <div v-if="formData.organizacionSocial === 'Sí'" class="mt-2">
                    <InputText placeholder="¿Cuál?" v-model="formData.organizacionCual" class="w-full p-2 border rounded-md" />
                </div>
            </div>

            <!-- Décima fila: Pregunta 23 -->
            <div class="flex flex-col gap-2 mt-4">
                <label class="font-semibold text-lg">23.- ¿Maneja algún tipo de red social?</label>
                <MultiSelect v-model="formData.redSocial" :options="redSocialOptions" optionLabel="name" placeholder="Seleccione opciones" class="w-full" />
            </div>

            <!-- Undécima fila: Pregunta 24 -->
            <div class="flex flex-col gap-2 mt-4">
                <label class="font-semibold text-lg">24.- ¿Cómo se entera de las noticias?</label>
                <InputText placeholder="Especifique" v-model="formData.noticias" class="w-full p-2 border rounded-md" />
            </div>

            <!-- 12 fila: Pregunta 25 -->
            <div class="flex flex-col gap-2 mt-4">
                <label class="font-semibold text-lg">25.- ¿Está de acuerdo o en desacuerdo con el trabajo realizado hasta ahora por el presidente municipal Yamil Melgas Bravo?</label>
                <Dropdown v-model="formData.trabajoPresidente" :options="trabajoRealizadoOptions" optionLabel="name" placeholder="Seleccione una opción" class="w-full" />
            </div>

            <!-- 12 fila: Pregunta 26 -->
            <div class="flex flex-col gap-2 mt-4">
                <label class="font-semibold text-lg">26.- ¿Que problema debería atender más rapidamente en el municipio el presidente Yamil Melgabr Bravo?</label>
                <Dropdown v-model="formData.atenderProblema" :options="problemasOptions" optionLabel="name" placeholder="Seleccione una opción" class="w-full" />
            </div>

            <!-- Observaciones -->
            <div class="flex flex-col gap-2 mt-4">
                <label class="font-semibold text-lg">Observaciones</label>
                <textarea v-model="formData.observaciones" class="w-full p-4 border rounded-md" rows="4" placeholder="Escriba las observaciones"></textarea>
            </div>

            <!-- Apartado para subir imágenes de evidencia -->
            <!-- <div class="flex flex-col gap-2 mt-4">
                <label class="font-semibold text-lg">Cargar imágenes de evidencia</label>
                <FileUpload
                    name="evidencia[]"
                    @uploader="onUpload"
                    :multiple="true"
                    accept="image/*"
                    :maxFileSize="1000000"
                    customUpload
                    class="w-full p-2 border rounded-md"
                >
                    <template #choose>
                        <button class="p-button p-component p-button-text">
                            <i class="pi pi-plus"></i>
                            <span>Cargar</span>
                        </button>
                    </template>

                    <template #upload>
                        <button class="p-button p-component p-button-text">
                            <i class="pi pi-upload"></i>
                            <span>Subir</span>
                        </button>
                    </template>

                    <template #cancel>
                        <button class="p-button p-component p-button-text">
                            <i class="pi pi-times"></i>
                            <span>Cancelar</span>
                        </button>
                    </template>
                </FileUpload>
            </div> -->

            <!-- Botón para guardar la entrevista -->
            <!-- <div class="flex justify-end mt-4">
                <button class="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600">Guardar entrevista</button>
            </div> -->
            <!-- <button @click="guardarEntrevista" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600">
                Guardar entrevista
            </button> -->

            <button @click="guardarEntrevista" class="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600">
                Guardar entrevista
            </button>

        </div>
        <Toast ref="toast" />
    </Fluid>
</template>
