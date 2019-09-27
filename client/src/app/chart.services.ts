import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatService {
  private url = 'http://localhost:8091';
  private socket;

  sendMessage(message) {
    this.socket.emit('add-message', message);
    console.log('MESSAGE SENT');
  }

  getLiveData1() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('real1', (data) => {

        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  getLiveData2() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('real2', (data) => {

        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  getLiveData3() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('real3', (data) => {

        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  getLiveData4() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('real4', (data) => {

        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
