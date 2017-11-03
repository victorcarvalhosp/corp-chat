import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import {User} from "firebase";
import {Observable} from "rxjs/Observable";
import {BaseProvider} from "./base.provider";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider extends BaseProvider{

  constructor(public http: Http,
              public afAuth: AngularFireAuth) {
    super();
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user: {email:string, password: string}): Promise<User>{
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).catch(this.handlePromiseError);
  }

  signinWithEmail(user: {email:string, password: string}): Promise<boolean>{
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then((authState) =>{
      return authState != null;
    }).catch(this.handlePromiseError);
  }

}
