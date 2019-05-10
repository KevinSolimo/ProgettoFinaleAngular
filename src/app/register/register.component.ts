import { Component, OnInit } from '@angular/core';

//Observer
import { Observable } from 'rxjs';

//Error Email Import Control
import { FormControl, Validators } from '@angular/forms';

//HTTP Client
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Router
import { Router } from '@angular/router';


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
      email.value == '' || user.value == '' || pass.value == '' || Validators.email) {
      this.error = ("First name, Last name, Username, Password and Email must be correct");
    } else {
      this.http
        .post('/register',
          JSON.stringify({
            'name': name.value,
            'surname': surname.value,
            'address': address.value,
            'city': city.value,
            'state': state.value,
            'postal': postal.value,
            'email': email.value,
            'user': user.value,
            'pass': pass.value
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
          console.log(data);

          this.router.navigate([""]);

        });
    }
  }

  //Control Email Error
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

}
