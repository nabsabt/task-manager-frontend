import { Component, inject, OnInit, signal } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  imports: [],
  providers: [],
})
export class AlertComponent implements OnInit {
  private alertService = inject(AlertService);
  public alertText = signal<string>('');
  ngOnInit(): void {
    this.alertText.set(this.alertService.alertText());
  }
}
