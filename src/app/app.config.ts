import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SchoolRegistrationComponent } from './school-registration/school-registration.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: SchoolRegistrationComponent },
  { path: 'registration/basic-info', redirectTo: 'register' },
  { path: 'registration/owner-info', redirectTo: 'register' },
  { path: 'registration/contact-info', redirectTo: 'register' },
  { path: 'registration/online-presence', redirectTo: 'register' },
  { path: 'registration/business-hours', redirectTo: 'register' },
  { path: 'registration/services', redirectTo: 'register' },
  { path: '**', redirectTo: 'register' }
];
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()]
};
