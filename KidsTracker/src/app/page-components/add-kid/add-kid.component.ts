import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-add-kid',
  templateUrl: './add-kid.component.html',
  styleUrls: ['./add-kid.component.css']
})
export class AddKidComponent implements OnInit {
  name: string;
  loggedUser: any = { kids: [] };
  constructor(
    private authService: AuthenticationService,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this.loggedUser = this.authService.getLoggedUser();
  }

  addKid() {
    const index = this.loggedUser.kids.findIndex(x => x === this.name);
    if (index >= 0) {
      this.toasterService.pop('error', '', 'You allready have Kid with this name. Please enter unique name.');
    } else {
      this.loggedUser.kids.push(this.name);
      this.authService.updateUser(this.loggedUser).subscribe(result => {
        if (result.success === true) {
          this.toasterService.pop('success', '', 'New Kid added to account!');
        }
      });
    }
  }

}
