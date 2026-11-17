import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule],
})
export class NavbarComponent {
  private breakPoint = inject(BreakpointObserver);
  public authService = inject(AuthService);
  public isHamburgerMenuOpened = signal<boolean>(false);
  public isMobileView = signal<boolean>(false);
  public document = inject(DOCUMENT);

  public loggedInUserName = signal<string | undefined>(undefined);

  constructor() {
    this.breakPoint.observe('(max-width: 768px)').subscribe((res) => {
      !res.matches ? this.isHamburgerMenuOpened.set(false) : '';
      !res.matches ? this.isMobileView.set(false) : this.isMobileView.set(true);
    });
    /**
     * checking for dark mode->
     */
    const darkModeOn =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (darkModeOn) {
      this.document.body.classList.add('dark');
    } else {
      this.document.body.classList.remove('dark');
    }
  }
  ngOnInit(): void {
    this.loggedInUserName.set(this.authService.$loggedInUser() ?? undefined);
  }

  toggleHamburgerMenu() {
    this.isHamburgerMenuOpened.set(!this.isHamburgerMenuOpened());
  }
}
