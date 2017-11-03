import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {User} from "../models/user.model";
import {FirebaseListObservable} from "angularfire2/database-deprecated";
import {Observable} from "rxjs/Observable";
import {BaseProvider} from "./base.provider";

@Injectable()
export class UserProvider extends BaseProvider{

  users: Observable<User[]>;
  usersRef: AngularFireList<any>;

  constructor(public http: Http,
              public afDB: AngularFireDatabase) {
    super();
    this.usersRef = this.afDB.list('/users');
    this.users = this.usersRef.valueChanges();
  }

  create(user){
    return this.afDB.object('/users/'+user.uid).set(user).catch(this.handlePromiseError);
    //return this.usersRef.push(user);
  }

  userExists(username: string): Observable<boolean>{
    console.log('CHAMOU MÉTODO');
      return this.afDB.list('/users', ref => ref.orderByChild('username').equalTo(username))
        .valueChanges()
        .map((users: User[]) => {
          return users.length > 0;
        }).catch(this.handleObservableError);
  }
}
