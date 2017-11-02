import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user.provider";
import {AuthProvider} from "../../providers/auth.provider";
import {User} from "../../models/user.model";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(public alertCtrl: AlertController,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              public authProvider: AuthProvider) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  onSubmit(): void {
    let formUser= this.signupForm.value;

    this.authProvider.createAuthUser({
      email: formUser.email,
      password: formUser.password
    }).then((authState) => {
      delete formUser.password;
      formUser.uid = authState.uid;
      console.log(formUser.uid + 'UID');
      this.userProvider.create(formUser)
        .then(() => {
          console.log('Usuário cadastrado!')
        });
    });



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

}
