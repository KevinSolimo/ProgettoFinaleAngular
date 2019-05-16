import { Component, OnInit } from '@angular/core';

import { QrCodeReader } from './../qr-code-reader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reader-qr',
  templateUrl: './reader-qr.component.html',
  styleUrls: ['./reader-qr.component.css']
})
export class ReaderQRComponent implements OnInit {

  subscription: Subscription;

  constructor(private qrReader: QrCodeReader) { }

  data = "";

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.subscription = this.qrReader.decode(file)
      .subscribe(decodedString => this.data = (decodedString));
  }
  ngOnInit() {
  }

}
