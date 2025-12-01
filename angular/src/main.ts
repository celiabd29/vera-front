// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// // import { App } from './app/app';
// import { AppComponent } from './app/app'

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
