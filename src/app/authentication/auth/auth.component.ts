import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { AuthData } from '../auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  adminForm: FormGroup;
  isLoading: boolean;

  constructor(
    public authService: AuthService,
    public route: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onLogin(): void {
    const auth = new AuthData(this.adminForm.value.username, this.adminForm.value.password);

    if (!auth) {
      return;
    }

    console.log(auth);

    this.authService.login(auth.username, auth.password);
  }

  errors(controlName: string | (string | number)[]): any {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.adminForm.get(controlName);
  }

  initForm(): void {
    this.adminForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

}
