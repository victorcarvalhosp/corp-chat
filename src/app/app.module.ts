import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AngularFireModule, FirebaseAppConfig} from "angularfire2";
import {SignupPage} from "../pages/signup/signup";
import { UserProvider } from '../providers/user.provider';
import {HttpModule} from "@angular/http";
import {AngularFireDatabaseModule} from "angularfire2/database";
import { AuthProvider } from '../providers/auth.provider';
import {AngularFireAuthModule} from "angularfire2/auth";
import {SigninPage} from "../pages/signin/signin";
import {CustomLoggedHeaderComponent} from "../components/custom-logged-header/custom-logged-header.component";
import {CapitalizePipe} from "../pipes/capitalize.pipe";
import {ChatPage} from "../pages/chat/chat";
import { ChatProvider } from '../providers/chat.provider';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyADpOCvJq80A8xgO50YDLkIqxpR3UMvgbk",
  authDomain: "corpchat-ionic2.firebaseapp.com",
  databaseURL: "https://corpchat-ionic2.firebaseio.com",
  storageBucket: "corpchat-ionic2.appspot.com",
  messagingSenderId: "251201162260"
};

@NgModule({
  declarations: [
    CapitalizePipe,
    CustomLoggedHeaderComponent,
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    CustomLoggedHeaderComponent,
    MyApp,
    HomePage,
    SignupPage,
    SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    AuthProvider,
    ChatProvider
  ]
})
export class AppModule {}
