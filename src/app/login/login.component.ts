import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { LoginData } from '../core/interfaces/task.manager.interface';
import { form, FormField, required } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormField],
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private loginModel = signal<LoginData>({ username: '', password: '' });
  public loginForm = form(this.loginModel, (schemaPath) => {
    (required(schemaPath.username, { message: 'Username required!' }),
      required(schemaPath.password, { message: 'Password required!' }));
  });
  public responseError = signal<string | undefined>(undefined);

  ngOnInit(): void {
    this.authService.$isAuthenticated() ? this.router.navigate(['/table']) : '';
  }

  public OnSubmitLogin() {
    this.authService.login(this.loginModel().username, this.loginModel().password).subscribe({
      next: (res) => {
        res.status === 'success'
          ? this.router.navigate(['/table'])
          : this.responseError.set(res.status);
      },
    });
  }
}
