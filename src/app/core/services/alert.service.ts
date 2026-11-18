import { Service, signal } from '@angular/core';

@Service()
export class AlertService {
  private isAlertShown = signal<boolean>(false);
  public $isAlertShown = this.isAlertShown.asReadonly();
  public alertText = signal<string>('');

  public showAlert(text: string) {
    this.isAlertShown.set(true);
    this.alertText.set(text);
    setTimeout(() => {
      this.isAlertShown.set(false);
      this.alertText.set('');
    }, 5000);
  }
}
