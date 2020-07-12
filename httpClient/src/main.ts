import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


//TODO Permitir a los padres que puedan ver las notas de sus hijos
//TODO Permitir a los alumnos que puedan ver sus notas
//TODO Restringir colcar la nota para cada profesor en específico.
//TODO Sacar registro de notas del componente actual para que sea más fácil
//TODO Sacar mantenimiento de carga académica del componente actual para que sea más fácil
//TODO Informe - Informe de notas de cada periodo por curso, donde salen todos los alumnos y todas sus materias.
//TODO Puesto dentro del grupo promedio general.
//TODO Crear/editar boletin
//TODO Cuando cambia el periodo no pueden meter más notas 
//TODO Informe - Informe de notas de cada periodo por curso, donde salen todos los alumnos y todas sus materias.
//TODO Registro de matricula
//TODO Impresión de matricula
//TODO CRUD El profesor puede registrar una inasistencia con descripción
//TODO CRUD El alumno puede indicar la razón por la cual no asistió y dejar un soporte
//TODO ???? Poder definir un boletín el formato
//TODO Promedio general del estudiante
//TODO Puesto que ocupó en el curso
//TODO Consulta formateada - El papa puede ver el boletín de notas
//TODO Activación de usuarios - Autorizar usuarios
//TODO Restricción - Si no se encuetnran al día los padres, no pueden ver el boletín, tampoco los alumnos
//TODO LA misma consulta de los papas - Los alumnos pueden ver sus notas
//TODO Imagen de la firma por usuario
//TODO Foto de los profesores
//TODO Foto del estudiante
//TODO Aseguramiento de la API
//TODO Mejoramiento de servicios de aplicación
//TODO https://docs.google.com/spreadsheets/d/1pu-1jXb_dFGe3BL6NAJAiIx5dU0fYHiuPJA1fwFqzpc/edit#gid=0
//TODO El usuario podrá realizar el reinicio de su clave utilizando su identificación y correo electrónico.
