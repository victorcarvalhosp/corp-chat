import {AlertController, App, MenuController, NavController} from "ionic-angular";
import {AuthProvider} from "../providers/auth.provider";
import {OnInit} from "@angular/core";
import {SigninPage} from "../pages/signin/signin";

export abstract class BaseComponent implements  OnInit{

  protected navCtrl: NavController;

  constructor(public alertCtrl: AlertController,
              public authProvider: AuthProvider,
              public app: App,
              public menuCtrl: MenuController){
  }

  ngOnInit(): void{
    this.navCtrl = this.app.getActiveNav();
  }

  onLogout(){
    this.alertCtrl.create({
      message: 'Do you want to quit?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.authProvider.logout().then(() => {
            this.navCtrl.setRoot(SigninPage);
          })
        }
      },
        {
          text: 'No'
        }]
    }).present();
  }
}
