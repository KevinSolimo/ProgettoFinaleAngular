import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginDialogComponent } from './dialog/login-dialog';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

//Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Mono-Rent';

  operation = 'Login';

  loginDialogRef: MatDialogRef<LoginDialogComponent>;

  o: Observable<Object>;

  constructor(private dialog: MatDialog, public http: HttpClient, private router: Router) {
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
          localStorage.setItem('logged', 'true');
          this.operation = 'Logout';
          console.log(value);
        });
    } else if (this.operation == 'Logout') {
      localStorage.setItem('logged', 'false');
      this.operation = 'Login';
    }
  }

  onRegister() {
    this.router.navigate(["/register"]);
  }

  onTitle() {
    this.router.navigate([""]);
  }

}
