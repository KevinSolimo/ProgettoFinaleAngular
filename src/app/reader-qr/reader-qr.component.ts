import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';

import { QrScannerComponent } from 'angular2-qrscanner';

@Component({
  selector: 'app-reader-qr',
  templateUrl: './reader-qr.component.html',
  styleUrls: ['./reader-qr.component.css']
})
export class ReaderQRComponent implements OnInit {

  constructor() { }

  decodedOutput(text: string) {
    console.log(text);
  }

  data = "";

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;

  ngOnInit() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('front')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });


    this.qrScannerComponent.capturedQr.subscribe(result => {
      this.data = result;
    });
  }

}
