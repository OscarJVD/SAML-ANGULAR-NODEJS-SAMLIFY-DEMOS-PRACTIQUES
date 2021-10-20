import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// Se añade el evento de la carga del contenido del DOM
document.addEventListener('DOMContentLoaded', () => { //<==== ESTO SE AÑADE
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err)); //<====== ESTO SE AÑADE
});
