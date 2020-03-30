import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
//TODO Visualizar Boletin 
//TODO Restringir los menus de acuerdo al perfil de quien accede.
//TODO Restringir colcar la nota para cada profesor en específico
//TODO Sacar registro de notas
//TODO Sacar mantenimiento de carga académica
//TODO Permitir a los padres que puedan ver las notas de sus hijos
//TODO Permitir a los alumnos que puedan ver sus notas
//TODO Crear boletin
//TODO Cuando cambia el periodo no pueden meter más notas 
  