import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { CircularLoaderComponent } from './core/components/loader/circular.loader';
import { LoaderService } from './core/services/loader.service';
import { AlertService } from './core/services/alert.service';
import { AlertComponent } from './core/components/alert/alert.component';

@Component({
  imports: [RouterOutlet, NavbarComponent, LoginComponent, CircularLoaderComponent, AlertComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  public loaderService = inject(LoaderService);
  public alertService = inject(AlertService);
}
