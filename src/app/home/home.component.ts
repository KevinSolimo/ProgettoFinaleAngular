import { Component, OnInit } from '@angular/core';

import { Monopattino } from './../MonopattiniModel/monopattino.model';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  o: Observable<Object>;
  oFoo: Observable<Monopattino[]>;
  fooData: Monopattino[] = [];

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
      width: 30,
      height: 40
    }
  };

  makeTypedRequest(): void {
    //oFoo : Observable<Foo[]>; va dichiarato tra gli attributi della classe
    this.oFoo = this.http.get<Monopattino[]>('http://localhost:3000/api/monopattini');
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

  constructor(public http: HttpClient) {

    this.findMe();
    this.calcoloDistanza();
    this.makeTypedRequest();

  }

  calcoloDistanza(): void {

    //Punto A 45.522457, 9.209638
    //Punto B 45.501299, 9.197877

    console.log(this.distanceBetweenCoordinates(45.522457, 9.209638, 45.501299, 9.197877));

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
