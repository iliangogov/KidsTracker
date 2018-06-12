import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit, OnDestroy {
  kidName: any;
  loggedUser: any = {};
  startEmitingInterval: any = {};
  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private socketService: SocketioService) { }

  ngOnInit() {
    // begin service worker try
    // navigator.serviceWorker.register('../../../serviceworker.js').then((registration) => {

    //   console.log('registration finished', registration.scope);
    // });
    // end service worker try

    this.loggedUser = this.authService.getLoggedUser();
    this.route.params.subscribe(params => {
      this.kidName = params['kidname'];
    });

    this.startSendingCoordinates();
  }

  startSendingCoordinates() {
    this.startEmitingInterval = setInterval(() => {
      //  if (navigator.geolocation) {
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
      //  }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.startEmitingInterval);
  }

}
