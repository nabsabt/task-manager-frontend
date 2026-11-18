import { Component, inject, OnInit, signal } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  imports: [],
  providers: [],
})
export class AlertComponent {
  public alertService = inject(AlertService);
}
