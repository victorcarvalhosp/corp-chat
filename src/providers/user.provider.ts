import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {User} from "../models/user.model";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserProvider {

  users: Observable<User[]>;
  usersRef: AngularFireList<any>;

  constructor(public http: Http,
              public afDB: AngularFireDatabase) {
    this.usersRef = this.afDB.list('/users');
    this.users = this.usersRef.valueChanges();
  }

  create(user){
    return this.afDB.object('/users/'+user.uid).set(user);
    //return this.usersRef.push(user);
  }
}
