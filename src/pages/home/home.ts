import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {AngularFireList} from "angularfire2/database";
import {UserProvider} from "../../providers/user.provider";
import {User} from "../../models/user.model";
import {Observable} from "rxjs/Observable";
import {AuthProvider} from "../../providers/auth.provider";
import {ChatPage} from "../chat/chat";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;
  view: string = 'chats';


  constructor(public authProvider: AuthProvider,
              public navCtrl: NavController,
              public userProvider: UserProvider) {

  }

  ionViewCanEnter(): Promise<boolean>{
    return this.authProvider.authenticated;
  }

  ionViewDidLoad() {
    this.users = this.userProvider.users;
  }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user: User) {
    console.log(user);
    this.navCtrl.push(ChatPage, {
      recipientUser: user
    })
  }

}
