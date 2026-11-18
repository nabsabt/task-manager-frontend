import { ApplicationRef, inject, Service, signal } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Subject } from 'rxjs';
import { SocketData } from '../interfaces/task.manager.interface';

@Service()
export class SocketService {
  private socket = inject(Socket);
  private appRef = inject(ApplicationRef);

  public showSocketAlert = signal<boolean>(false);

  private socketEvents = new Subject<SocketData>();
  public socketEvents$ = this.socketEvents.asObservable();
  public socketMessage = signal<string | undefined>(undefined);

  getMessage() {
    return this.socket.fromEvent('dataChangeMessage').pipe(
      map((data: SocketData) => {
        this.socketMessage.set(data.message);
        this.socketEvents.next(data);
        this.appRef.tick();
        this.showSocketAlert.set(true);
        setTimeout(() => {
          this.showSocketAlert.set(false);
        }, 4000);
      }),
    );
  }
}
