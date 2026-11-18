import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './auth.guard';
import { provideSocketIo, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';

const config: SocketIoConfig = { url: environment.apiSocketURL, options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    AuthGuard,
    provideSocketIo(config),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};
