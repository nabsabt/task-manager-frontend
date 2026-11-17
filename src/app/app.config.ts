import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [AuthService, AuthGuard, provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};
