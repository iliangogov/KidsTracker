import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';

@Injectable()
export class SocketioService {

  constructor(private socket: Socket) { }

  sendCoordinates(kidObject: any): void {
    this.socket.emit('parent', { ...kidObject });
  }

  getCoordinates(kidNameAndParrentId: string) {
    return this.socket
      .fromEvent<any>(kidNameAndParrentId);
  }

}
