import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignupPage} from "../signup/signup";
import {AuthProvider} from "../../providers/auth.provider";
import {HomePage} from "../home/home";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(public authProvider: AuthProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder
  ) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void{
      console.log("ON SUBMIT");
      let loading: Loading = this.showLoading();
      this.authProvider.signinWithEmail(this.signinForm.value)
        .then((isLogged: boolean) => {
          if(isLogged){
            this.navCtrl.setRoot(HomePage);
            loading.dismiss();
          }
        }).catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);
      })
  }

  onSignup(){
    this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

  goToHome(){
    this.navCtrl.push(HomePage)
      .then((hasAccess: boolean) => {
        console.log('Autorizado:', hasAccess );
      }).catch(err => {
        console.log('Não autorizado', err);
    })
  }

  logout(): void{
    this.authProvider.logout();
  }

}
