import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.logout();
  }

  login(): void {
    this.loading = true;
    this.authService.login(this.user).subscribe(
      result => {
        if (result.success === true) {
          this.loading = false;
          this.router.navigate(['/home']).then(() => {
            alert('Successfully logged in!');
          });
        } else {
          this.loading = false;
          alert(`Error: ${result.msg}`);
        }
      },
      error => {
        const respond = JSON.parse(error._body);
        if (respond.passwordErr === true || respond.emailErr) {
          this.loading = false;
          alert(`Error: ${respond.err}`);
        }
      }
    );
  }

}
