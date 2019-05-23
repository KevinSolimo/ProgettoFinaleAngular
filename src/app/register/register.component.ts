import { Component, OnInit } from '@angular/core';

//Observer
import { Observable } from 'rxjs';

//Error Email Import Control
import { FormControl, Validators } from '@angular/forms';

//HTTP Client
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Router
import { Router } from '@angular/router';

//Cryoto
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  o: Observable<Object>;

  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  error: String;

  //Hide Password
  hide = true;

  onClick(name: HTMLInputElement, surname: HTMLInputElement, address: HTMLInputElement, city: HTMLInputElement, state: HTMLInputElement, postal: HTMLInputElement, email: HTMLInputElement, user: HTMLInputElement, pass: HTMLInputElement): void {

    if (name.value == '' || surname.value == '' ||
      email.value == '' || user.value == '' || pass.value == '') {
      this.error = ("First name, Last name, Username, Password and Email must be correct");
    } else {

      var salt = CryptoJS.lib.WordArray.random(16) + "";
      var passHash = CryptoJS.SHA256(pass.value) + "";
      var hashPass = CryptoJS.HmacSHA256(passHash, salt) + "";
      //A2F4154AD98C461261FDD155B93D8C2B13412426FC64A85FE823B9F5608DF75A
      this.http
        .post('http://localhost:3000/api/register',
          JSON.stringify({
            'name': name.value,
            'surname': surname.value,
            'address': address.value,
            'city': city.value,
            'state': state.value,
            'postal': postal.value,
            'email': email.value,
            'user': user.value,
            'pass': hashPass,
            'salt': salt
          }),
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
          if (date.state == 'user exist') {
            this.error = "Username already exist!"
          } else if (date.state == 'ok') {
            this.router.navigate([""]);
          }
        });
    }
  }

  //Control Email Error
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

}
