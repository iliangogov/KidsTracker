import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToasterService } from 'angular2-toaster';

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
    private router: Router,
    private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.authService.logout();
  }

  login(): void {
    this.loading = true;
    this.authService.login(this.user).subscribe(
      result => {
        if (result.success === true) {
          this.loading = false;
          this.router.navigate(['/select-role']).then(() => {
            this.toasterService.pop('success', '', 'Successfuly logged in!');
          });
        } else {
          this.loading = false;
          this.toasterService.pop('error', '', result.msg);
        }
      },
      error => {
        const respond = JSON.parse(error._body);
        if (respond.passwordErr === true || respond.emailErr) {
          this.loading = false;
          this.toasterService.pop('error', '', respond.err);
        }
      }
    );
  }

}
