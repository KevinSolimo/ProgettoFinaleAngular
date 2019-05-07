import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mono-Rent';


  //Cordinate Milano 45,4773; 9,1815
  lat: number = 45.4773;
  lng: number = 9.1815;

  constructor() { this.findMe(); this.calcoloDistanza(); }

  calcoloDistanza() {

    //Punto A 45.522457, 9.209638
    //Punto B 45.501299, 9.197877
    
    this.distanceInKmBetweenEarthCoordinates(45.522457, 9.209638,45.501299, 9.197877);

  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {

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
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
}
