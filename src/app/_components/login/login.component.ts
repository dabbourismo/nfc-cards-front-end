import { Client } from './../../_models/Client';
import { LoginService } from './../../services/login.service';
import { NotificationDialogService } from './../../services/notification-dialog.service';
import { Component, Input, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, finalize } from 'rxjs/operators';
import { ClientPersonal } from 'src/app/_models/ClientPersonal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginNormal: boolean;
  public loginSerial: boolean;

  @Input() error: string | null;


  formLoginNormal: FormGroup;
  formLoginSerial: FormGroup;
  isLoading: boolean;


  constructor(public notificationsService: NotificationDialogService,
    private router: Router, public loginService: LoginService) { }

  ngOnInit(): void {
    localStorage.clear();
    localStorage.setItem('isLoggedIn', 'false');

    this.loginNormal = true;
    this.loginSerial = false;

    this.formLoginNormal = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });


    this.formLoginSerial = new FormGroup({
      serial: new FormControl('', [Validators.required]),
    });
  }


  //Normal Login
  login(loginformValues) {
    if (this.formLoginNormal.valid) {
      this.isLoading = true;
      this.loginService.login(loginformValues.username, loginformValues.password)
        .pipe(
          map(response => this.handleLoginResponse(response)),
          finalize(() => { this.isLoading = false; })
        )
        .subscribe();
    }
  }

  private handleLoginResponse(response: Client) {
    if (response != null) {
      localStorage.setItem('clientPersonalDto', JSON.stringify(response.clientPersonalDto));
      localStorage.setItem('clientSocialDto', JSON.stringify(response.clientSocialDto));
      this.assignLoginStatus();

      this.notificationsService.success('Logged In!');
      this.router.navigate(['/shell/'])
    }
    else {
      this.notificationsService.delete('Invalid Data!');
    }
  }
  //=================================================================
  //Login using serial
  loginUsingSerial(loginformValues) {
    if (this.formLoginSerial.valid) {
      this.isLoading = true;
      this.loginService.loginSerialOnly(loginformValues.serial)
        .pipe(
          map(response => this.handleLoginSerialResponse(response)),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  }

  private handleLoginSerialResponse(response: Client) {

    if (response != null) {
      localStorage.setItem('clientPersonalDto', JSON.stringify(response.clientPersonalDto));
      localStorage.setItem('clientSocialDto', JSON.stringify(response.clientSocialDto));

      this.notificationsService.success('Serial is correct - Logged In!');
      this.assignLoginStatus();
      this.router.navigate(['/shell/'])
    }
    else {
      this.notificationsService.delete('Serial is not correct or has been used!');
    }


  }


  public hasError = (controlName: string, errorName: string) => {
    return this.formLoginNormal.controls[controlName].hasError(errorName);
  }

  public hasErrorSerial = (controlName: string, errorName: string) => {
    return this.formLoginSerial.controls[controlName].hasError(errorName);
  }


  switchLogin() {
    this.loginSerial = !this.loginSerial;
    this.loginNormal = !this.loginNormal;
  }

  private assignLoginStatus() {
    localStorage.setItem('isLoggedIn', 'true');
  }
}
