import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';


@Injectable()
export class WebsocketService {

    // Our socket connection
    private socket;

    constructor() { }

    connect(): Rx.Subject<MessageEvent> {
        this.socket = io("http://localhost:3001");
        let observable = new Observable(observer => {
            this.socket.on('message', (data) => {
                console.log("Received message from Websocket Server")
                observer.next(data);
            })
            return () => {
                this.socket.disconnect();
            }
        });

        let observer = {
            next: (data: Object) => {
                this.socket.emit('message', JSON.stringify(data));
            },
        };

        // we return our Rx.Subject which is a combination
        // of both an observer and observable.
        return Rx.Subject.create(observer, observable);
    }

}
