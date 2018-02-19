import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.css']
})
export class SelectRoleComponent implements OnInit {
  user: any = {};
  showMapButton = false;
  showAddKidButton = false;
  showKidsList = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toasterService: ToasterService) { }

  ngOnInit(): void {
    const loggedUser = this.authService.getLoggedUser();
    this.authService.getUserById(loggedUser._id).subscribe(data => {
      this.user = data.user;
    });
  }

  handleParentChoice(): void {
    this.showKidsList = false;
    if (this.user.kids.length > 0) {
      this.showMapButton = true;
      this.showAddKidButton = true;
    } else {
      this.showAddKidButton = true;
    }
  }

  handleKidChoice(): void {
    this.showMapButton = false;
    this.showAddKidButton = false;
    if (this.user.kids.length > 0) {
      this.showKidsList = true;
    } else {
      this.toasterService.pop('error', '', 'No kids to select, please add a kid first!');
    }
  }

}
