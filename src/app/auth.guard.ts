import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuth = this.authService.$isAuthenticated();

    if (!isAuth) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
