import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading/loading.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/Auth/auth.service';
import { MessageBoxService } from '../../services/message-box.service';
import User from '../../models/User';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginComponent {
  myForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private loadingService: LoadingService,
    private http: HttpClient,
    private authService: AuthService,
    private messageBox: MessageBoxService
  ) {
    this.myForm = fb.group({
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required]],
    });
  }

  onSubmitForm() {
    if (this.myForm.valid) {
      this.loadingService.startLoading();
      const email = this.email?.value;
      const password = this.password?.value;
      const url = this.authService.baseUrl('/users/login');
      const body = { email, password };
      this.http.post(url, body).subscribe(
        async (data: any) => {
          this.loadingService.stopLoading();
          if (data.token) {
            localStorage.setItem('access_token', data.token);
          }
          this.messageBox.success('Authentification réussie');

          // then, get the user_info
          try {
            const userInfo: User = await this.authService.getUserInfo();
            this.authService.setUser(userInfo);
          } catch (error) {
            console.error('user null');
            this.authService.setUser(undefined);
          }

          this.router.navigate(['/']);
        },
        (err) => {
          this.loadingService.stopLoading();
          console.error(err);
        }
      );
    }
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }
}
