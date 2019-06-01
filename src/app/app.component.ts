import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginDialogComponent } from './dialog/login-dialog';

import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

//Router
import { Router } from '@angular/router';

import { MessageService } from './message.service';

//Cryoto
import * as CryptoJS from 'crypto-js';

import { State } from './Model/state.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Mono-Rent';

  operation = 'Login';

  loginDialogRef: MatDialogRef<LoginDialogComponent>;

  o: Observable<State>;

  constructor(private dialog: MatDialog, public http: HttpClient, private router: Router, private messageService: MessageService) {
    localStorage.getItem('logged') == 'true' ? this.operation = 'Logout' : this.operation = 'Login';
  }

  openAddFileDialog(operation: String) {
    if (this.operation == 'Login') {
      this.loginDialogRef = this.dialog.open(LoginDialogComponent, {
        hasBackdrop: false
      });

      this.loginDialogRef
        .afterClosed()
        .subscribe(value => {
          if (value != '') {
            var passHash = CryptoJS.SHA256(value.password) + "";
            this.http
            //https://3000-e7a43567-abda-4ed8-9d88-e41194d34ad5.ws-eu0.gitpod.io
              .get<State>('https://3000-e7a43567-abda-4ed8-9d88-e41194d34ad5.ws-eu0.gitpod.io/api/login/' + value.username + '/' + passHash,
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
                if (data.state == 'ok') {
                  localStorage.setItem('logged', 'true');
                  localStorage.setItem('id_Utente', data.id_Utente);
                  this.sendMessage(true);
                  this.operation = 'Logout';
                }
              });
            console.log(value);
          }
        });
    } else if (this.operation == 'Logout') {
      localStorage.setItem('logged', 'false');
      this.sendMessage(false);
      this.operation = 'Login';
    }
  }

  onRegister() {
    this.router.navigate(["/register"]);
  }

  onTitle() {
    this.router.navigate([""]);
  }

  sendMessage(message): void {
    this.messageService.sendMessage(message);
  }

}
