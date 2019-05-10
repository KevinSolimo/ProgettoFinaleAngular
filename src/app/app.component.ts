import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginDialogComponent } from './dialog/login-dialog';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dialog: MatDialog) { }

  title = 'Mono-Rent';

  operation = 'Login';

  loginDialogRef: MatDialogRef<LoginDialogComponent>;


  openAddFileDialog(operation: String) {
    if (operation == 'Login') {
      this.loginDialogRef = this.dialog.open(LoginDialogComponent, {
        hasBackdrop: false
      });

      this.loginDialogRef
        .afterClosed()
        .pipe(filter(name => name))
        .subscribe(name => console.log(name));
    }
  }
}
