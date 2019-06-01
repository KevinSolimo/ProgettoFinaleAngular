import { Component, OnInit } from '@angular/core';

import { QrCodeReader } from './../qr-code-reader.service';
import { Subscription } from 'rxjs';

//HTTP Client
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { State } from '../Model/state.model';
import { Track } from '../Model/track.model';

@Component({
  selector: 'app-reader-qr',
  templateUrl: './reader-qr.component.html',
  styleUrls: ['./reader-qr.component.css']
})
export class ReaderQRComponent implements OnInit {

  subscription: Subscription;

  error = "";

  constructor(private qrReader: QrCodeReader, public http: HttpClient) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onUnlock(event) {
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
      .subscribe(decodedString => {

        if (decodedString == "error decoding QR Code") {
          this.error = "Error: QR code not recognized, try again."
        } else {
          this.http
            //https://8080-b170ea1e-2add-4b1e-8ece-21677fc9fc8e.ws-eu0.gitpod.io
            .get<State>('https://8080-b170ea1e-2add-4b1e-8ece-21677fc9fc8e.ws-eu0.gitpod.io/api/unlock/' + decodedString + '/' + localStorage.getItem('id_Utente'),
              {
                headers:
                  new HttpHeaders(
                    {
                      'Content-Type': 'application/json',
                      'X-Requested-With': 'XMLHttpRequest',
                      'Access-Control-Allow-Origin': '*'
                    }
                  )
              }
            )
            .subscribe(data => {
              console.log(data);
              localStorage.setItem('date', data.date.toString());
            });
        }
      });
  }

  onLock(event) {
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
      .subscribe(decodedString => {

        if (decodedString == "error decoding QR Code") {
          this.error = "Error: QR code not recognized, try again."
        } else {
          this.http
            //https://8080-b170ea1e-2add-4b1e-8ece-21677fc9fc8e.ws-eu0.gitpod.io
            .get<Track>('https://8080-b170ea1e-2add-4b1e-8ece-21677fc9fc8e.ws-eu0.gitpod.io/api/lock/' + decodedString + '/' + localStorage.getItem('id_Utente') + '/' + localStorage.getItem('date'),
              {
                headers:
                  new HttpHeaders(
                    {
                      'Content-Type': 'application/json',
                      'X-Requested-With': 'XMLHttpRequest',
                      'Access-Control-Allow-Origin': '*'
                    }
                  )
              }
            )
            .subscribe(data => {
              localStorage.setItem('date', '');
            });
        }

      });
  }

  onBroken(event) {
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
      .subscribe(decodedString => {

        if (decodedString == "error decoding QR Code") {
          this.error = "Error: QR code not recognized, try again."
        } else {
          this.http
            //https://8080-b170ea1e-2add-4b1e-8ece-21677fc9fc8e.ws-eu0.gitpod.io
            .get<State>('https://8080-b170ea1e-2add-4b1e-8ece-21677fc9fc8e.ws-eu0.gitpod.io/api/broken/' + decodedString,
              {
                headers:
                  new HttpHeaders(
                    {
                      'Content-Type': 'application/json',
                      'X-Requested-With': 'XMLHttpRequest',
                      'Access-Control-Allow-Origin': '*'
                    }
                  )
              }
            )
            .subscribe(data => {

            });
        }

      });
  }

  ngOnInit() {
  }

}
