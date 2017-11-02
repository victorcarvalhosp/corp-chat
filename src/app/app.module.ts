import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AngularFireModule, FirebaseAppConfig} from "angularfire2";

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyADpOCvJq80A8xgO50YDLkIqxpR3UMvgbk",
  authDomain: "corpchat-ionic2.firebaseapp.com",
  databaseURL: "https://corpchat-ionic2.firebaseio.com",
  storageBucket: "corpchat-ionic2.appspot.com",
  messagingSenderId: "251201162260"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
