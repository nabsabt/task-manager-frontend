import { Component, inject } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'socket-alert',
  templateUrl: './socket.alert.component.html',
  imports: [],
  providers: [],
})
export class SocketAlertComponent {
  public socketService = inject(SocketService);
}
