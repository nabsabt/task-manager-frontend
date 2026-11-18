import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Service()
export class AuthService {
  private readonly http = inject(HttpClient);
  private loaderService = inject(LoaderService);
  private router = inject(Router);
  private alert = inject(AlertService);

  private loggedInUser = signal<string | undefined>(
    localStorage.getItem('loggedInName') ?? undefined,
  );
  public $loggedInUser = this.loggedInUser.asReadonly();
  private isAuthenticated = signal<boolean>(!!this.loggedInUser());
  public $isAuthenticated = this.isAuthenticated.asReadonly();
  constructor() {}

  public login(
    username: string,
    pw: string,
  ): Observable<{ status: string; userData: { loggedInName: string } | undefined }> {
    this.loaderService.showLoader();
    return this.http
      .get<{ status: string; userData: { loggedInName: string } | undefined }>(
        `${environment.apiURL}auth/login`,
        {
          params: { username, password: pw },
        },
      )
      .pipe(
        map((res) => {
          if (res.status === 'success' && res.userData?.loggedInName) {
            this.loggedInUser.set(res.userData?.loggedInName);
            console.log(`loggedinuser: ${this.loggedInUser()}`);
            localStorage.setItem('loggedInName', res.userData?.loggedInName);
            this.isAuthenticated.set(true);
          }
          this.alert.showAlert(res.status === 'success' ? 'Successful login' : res.status);
          return res;
        }),
        catchError((error) => {
          this.alert.showAlert(error.message ?? error);
          return throwError(() => new Error(error.message ?? error));
        }),
        finalize(() => {
          this.loaderService.hideLoader();
        }),
      );
  }

  public logout() {
    this.alert.showAlert('Logged out.');
    this.isAuthenticated.set(false);
    this.loggedInUser.set(undefined);
    localStorage.removeItem('loggedInName');
    this.router.navigate(['/login']);
  }
}
