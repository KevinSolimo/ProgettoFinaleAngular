import { Component, OnInit } from '@angular/core';

import { QrCodeReader } from './../qr-code-reader.service';
import { Subscription } from 'rxjs';

//HTTP Client
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reader-qr',
  templateUrl: './reader-qr.component.html',
  styleUrls: ['./reader-qr.component.css']
})
export class ReaderQRComponent implements OnInit {

  subscription: Subscription;

  constructor(private qrReader: QrCodeReader, public http: HttpClient) { }

  error = "";

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
      .subscribe(decodedString => {

        if (decodedString == "error decoding QR Code") {
          this.error = "Error: QR code not recognized, try again."
        } else {
          this.http
            .get('http://localhost:8080/api/unlock/' + decodedString,
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
              var date: any = data;

              console.log(data);

              if (date.state == 'user exist') {
                this.error = "Username already exist!"
              } else if (date.state == 'ok') {
                //this.router.navigate([""]);
              }
            });
        }

      });
  }
  ngOnInit() {
  }

}
