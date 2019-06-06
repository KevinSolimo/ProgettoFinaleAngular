import { Component, OnInit } from '@angular/core';

import { QrCodeReader } from './../qr-code-reader.service';
import { Subscription } from 'rxjs';

//HTTP Client
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { State } from '../Model/state.model';
import { Track } from '../Model/track.model';

import { MatDialog, MatDialogRef } from '@angular/material';

import { RepairDialogComponent } from '../dialog/repair.dialog';

@Component({
  selector: 'app-reader-qr',
  templateUrl: './reader-qr.component.html',
  styleUrls: ['./reader-qr.component.css']
})
export class ReaderQRComponent implements OnInit {

  subscription: Subscription;

  error = "";

  constructor(private qrReader: QrCodeReader, public http: HttpClient, private dialog: MatDialog) { }

  repairDialogRef: MatDialogRef<RepairDialogComponent>;

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
          this.error = "";
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
              console.log(data.tempo);
              localStorage.setItem('date', '');
              var somma = 0;
              data.position.forEach((posizione, index, array) => {
                var i = index + 1;
                console.log(somma);
                if (array.length > i) {
                  somma += (this.distanceBetweenCoordinates(array[index].lat, array[index].lng, array[i].lat, array[i].lng));
                }
              });
              var time = new Date(data.tempo.ora_Blocco).getTime() - new Date(data.tempo.ora_Sblocco).getTime();
              console.log('Chilometri percorso : ' + somma + ' in ' + (time / 60000) + ' minuti');
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

          //OPEN DIALOG//
          this.repairDialogRef = this.dialog.open(RepairDialogComponent, {
            hasBackdrop: false
          });

          this.repairDialogRef
            .afterClosed()
            .subscribe(value => {
              console.log(value);
            });


          //REQUEST BROKEN//
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

  calcoloDistanza(): void {

    //Punto A 45.522457, 9.209638
    //Punto B 45.501299, 9.197877



  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  distanceBetweenCoordinates(lat1, lon1, lat2, lon2) {

    const earthRadiusKm = 6371;

    var dLat = this.degreesToRadians(lat2 - lat1);
    var dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (earthRadiusKm * c);

  }

}
