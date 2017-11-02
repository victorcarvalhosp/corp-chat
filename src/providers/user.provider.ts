import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from "angularfire2/database";
import {User} from "../models/user.model";

@Injectable()
export class UserProvider {

  constructor(public http: Http,
              public afDB: AngularFireDatabase) {
    console.log('Hello UserProvider Provider');
  }

  create(user: User){
    return this.afDB.list('/users').push(user);
  }
}
