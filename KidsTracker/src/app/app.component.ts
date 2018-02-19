import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      timeout: 6000,
      mouseoverTimerStop: true
    });

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  get isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
