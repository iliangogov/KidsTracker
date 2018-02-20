import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  kidName: any;
  loggedUser: any = {};
  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private socketService: SocketioService) { }

  ngOnInit() {
    this.loggedUser = this.authService.getLoggedUser();
    this.route.params.subscribe(params => {
      this.kidName = params['kidname'];
    });


    setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const kid = {
            parentId: this.loggedUser._id,
            name: this.kidName,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log(`${this.kidName} coordinates sent: lat:${position.coords.latitude} long: ${position.coords.longitude}`);
          this.socketService.sendCoordinates(kid);
        });
      }
    }, 1000);
  }

}
