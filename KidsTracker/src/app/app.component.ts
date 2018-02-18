import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  get isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut(): void {
    this.authService.logout();
  }
}
