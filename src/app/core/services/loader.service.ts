import { Service, signal } from '@angular/core';

@Service()
export class LoaderService {
  private activeRequests = 0;
  private isLoading = signal<boolean>(false);
  public $isLoading = this.isLoading.asReadonly();

  public showLoader() {
    this.activeRequests++;
    if (this.activeRequests > 0) {
      this.isLoading.set(true);
    }
  }

  public hideLoader() {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this.activeRequests = 0;
      this.isLoading.set(false);
    }
  }
}
