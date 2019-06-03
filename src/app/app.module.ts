import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Routing
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

//QRCode Reader
import { QrCodeReader } from './qr-code-reader.service';

//Material Design Animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material Design Component
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

//Http Import
import { HttpClientModule } from '@angular/common/http';

//Component
import { ReaderQRComponent } from './reader-qr/reader-qr.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginDialogComponent } from './dialog/login-dialog';

//Maps AGM
import { AgmCoreModule } from '@agm/core';
import { RepairDialogComponent } from './dialog/repair.dialog';

//Routing delle pagine
const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent }
];

//

@NgModule({
  declarations: [
    AppComponent,
    ReaderQRComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LoginDialogComponent,
    RepairDialogComponent
  ],
  imports: [
    //AGM GoogleMaps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCzUI8LYmnHPyFrtRT8Q8IEREZfOygUl-U'
    }),
    //Import Routin variable
    RouterModule.forRoot(
      appRoutes
    ),
    //HTTP Module
    HttpClientModule,
    //Other Import
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [
    //QR Reader
    QrCodeReader
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginDialogComponent,
    RepairDialogComponent
  ]
})

export class AppModule { }
