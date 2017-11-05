import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {User} from "../models/user.model";
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {Observable} from "rxjs/Observable";
import {BaseProvider} from "./base.provider";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class UserProvider extends BaseProvider{

  users: Observable<User[]>;
  usersRef: AngularFireList<any>;
  currentUser: AngularFireObject<User>;

  constructor(public http: Http,
              public afDB: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
    super();
    // this.usersRef = this.afDB.list('/users');
    // this.users = this.usersRef.valueChanges();
    this.listenAuthState();
  }

  private setUsers(uidToExclude: string): void{
    console.log('CHAMOU SETUSERS' + uidToExclude);
    this.usersRef = this.afDB.list('/users', ref => ref.orderByChild('name'));
    this.users = this.usersRef.valueChanges()
      .map((users: User[]) => {
      return users.filter((user: User) => user.uid != uidToExclude);
    });
  }

  private listenAuthState():void{
    this.afAuth.authState.subscribe((authState) => {
      if(authState){
        this.currentUser = this.afDB.object('/users/'+ authState.uid);
        this.setUsers(authState.uid);
      }
    })
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
