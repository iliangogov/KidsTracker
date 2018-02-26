import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: any = {};
  repeatedEmail: string;
  repeatedPassword: string;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toasterService: ToasterService) { }

  ngOnInit() {
  }

  registerUser() {
    if (this.repeatedEmail === this.newUser.loginEmail && this.repeatedPassword === this.newUser.password) {
      this.authService.createUser(this.newUser).subscribe(result => {
        if (result.success === true) {
          const registeredUser = result.person.firstName;
          this.toasterService.pop('success', '', `User ${registeredUser} was successfuly registered!`);
          this.router.navigate(['/home']);
        } else {
          this.toasterService.pop('error', '', 'Something went wrong. Please try again');
        }
      });
    } else {
      this.toasterService.pop('error', '', 'Email or password confirmation not matching!');
    }
  }

}
