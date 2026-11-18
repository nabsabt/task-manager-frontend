import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';
import { AlertService } from './alert.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const alertService = inject(AlertService);
  const username = authService.$loggedInUser();

  const authReq = username
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${username}`),
      })
    : req;
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        alertService.showAlert(error.error.message);
        authService.logout();
      }

      return throwError(() => error);
    }),
  );
};
