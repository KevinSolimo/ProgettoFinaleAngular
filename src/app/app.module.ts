import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Routing
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

//QRCode Reader

//Material Design Animation
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Material Design Component
import {MatButtonModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//Component
import { ReaderQRComponent } from './reader-qr/reader-qr.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//Http Import
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

//Maps AGM
import { AgmCoreModule } from '@agm/core';

//Routing delle pagine
const appRoutes: Routes = [
  { path: 'register', component:  RegisterComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ReaderQRComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
