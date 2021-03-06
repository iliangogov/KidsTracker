import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { SocketioService } from '../../services/socketio.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  loggedUser: any = {};
  kidsList: any[] = [];
  initialLatitude: number;
  initialLongitude: number;
  zoom = 18;
  mapType = 'roadmap';

  constructor(
    private authService: AuthenticationService,
    private socketService: SocketioService) { }

  ngOnInit() {
    this.loggedUser = this.authService.getLoggedUser();
    this.loggedUser.kids.forEach(kid => {
      this.socketService.getCoordinates(kid + this.loggedUser._id).subscribe(data => {
        this.initialLatitude = data.result.lat;
        this.initialLongitude = data.result.lng;
        const kidIndex = this.kidsList.findIndex(k => k.name === data.result.name);
        if (kidIndex >= 0) {
          this.kidsList[kidIndex].lat = data.result.lat;
          this.kidsList[kidIndex].lng = data.result.lng;
        } else {
          this.kidsList.push({
            name: data.result.name,
            lat: data.result.lat,
            lng: data.result.lng
          });
        }
        console.log(`${data.result.name}, lat: ${data.result.lat}, lng: ${data.result.lng}`);
      });
    });

    // setTimeout(() => {
    //   console.log(this.kidsList);
    //   if (this.kidsList.length === 0) {
    //     setInterval(() => {
    //       if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(position => {
    //           const me = {
    //             parentId: this.loggedUser._id,
    //             name: 'Me',
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //           };

    //           this.initialLatitude = me.lat;
    //           this.initialLongitude = me.lng;

    //           this.kidsList = [];
    //           this.kidsList.push(me);
    //         });
    //       }
    //     }, 1000);
    //   }
    // }, 1000);
  }
}
