import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {BaseProvider} from "./base.provider";
import {Chat} from "../models/chat.model";
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import {FirebaseObjectObservable} from "angularfire2/database-deprecated";

@Injectable()
export class ChatProvider extends BaseProvider{

  constructor(public afDB: AngularFireDatabase,
              public http: Http) {
    super();
    console.log('Hello ChatProvider Provider');
  }

  create(chat: Chat, userId1: string, userId2: string): Promise<void>{
    return this.afDB.object('/chats/'+ userId1+'/'+ userId2).set(chat)
      .catch(this.handlePromiseError);
  }

  getDeepChat( userId1: string, userId2: string): AngularFireObject<Chat>{
    return this.afDB.object('/chats/'+ userId1+'/'+ userId2);
  }

}
