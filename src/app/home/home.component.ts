import { Component, OnInit, Input } from '@angular/core';

import { Monopattino } from './../MonopattiniModel/monopattino.model';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  o: Observable<Object>;
  oFoo: Observable<Monopattino[]>;
  fooData: Monopattino[] = [];

  message: any;
  subscription: Subscription;

  logged: Boolean

  //Icon position user
  iconPerson = {
    url: 'assets/images/Position.png',
    scaledSize: {
      width: 30,
      height: 40
    }
  };

  //Icon position monopattino
  iconScooter = {
    url: 'assets/images/monopattino.png',
    scaledSize: {
      width: 50,
      height: 40
    }
  };

  makeTypedRequest(): void {
    //oFoo : Observable<Foo[]>; va dichiarato tra gli attributi della classe
    //https://8080-b170ea1e-2add-4b1e-8ece-21677fc9fc8e.ws-eu0.gitpod.io
    this.oFoo = this.http.get<Monopattino[]>('https://8080-b170ea1e-2add-4b1e-8ece-21677fc9fc8e.ws-eu0.gitpod.io/api/monopattini');
    this.oFoo.subscribe(data => {
      data.forEach(one => {
        this.fooData.push(one);
        console.log(one);
      })
    });
  }

  ngOnInit() {

  }

  //Cordinate Milano 45,4773; 9,1815
  lat: number = 45.4773;
  lng: number = 9.1815;

  constructor(public http: HttpClient, private messageService: MessageService) {

    this.findMe();
    this.makeTypedRequest();

    localStorage.getItem('logged') == 'true' ? this.logged = true : this.logged = false;

    this.subscription = this.messageService.getMessage()
      .subscribe(message => {
        this.logged = message.text;
      });
  }






  findMe() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log("OK!");
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
}
