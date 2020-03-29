import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
//TODO Verificar las llaves unicas
//TODO Arreglar desempeños que se duplicaron
//TODO Colocar filtro de materias para colocar desempeños
//TODO Director de cada curso
//TODO Información del director del colegio
//TODO Visualizar Boletin 
//TODO Restringir los menus de acuerdo al perfil de quien accede.
//TODO Restringir colcar la nota para cada profesor en específico
//TODO Permitir a los padres que puedan ver las notas de sus hijos
//TODO Permitir a los alumnos que puedan ver sus notas
//TODO Crear boletin
//TODO Cuando cambia el periodo no pueden meter más notas 
  