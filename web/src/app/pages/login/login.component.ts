import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { IGenericResponse, IUser, UserRole } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  loading: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['faisal1@gmail.com', [Validators.required, Validators.email]],
      password: ['password', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;
      const user = {
        email: email,
        password: password
      }
      this.http.post<IGenericResponse<IUser>>('http://localhost:3000/user/login', user).subscribe(resp => {
        if(resp.status === HttpStatusCode.Ok) {
          if(resp.data.role === UserRole.MART ) {
            console.log('Mart ID:', resp.data.id);
            this.router.navigate(['/admin/consumer'])
          } else if(resp.data.role === UserRole.COMPANY ) {
            console.log('Company ID:', resp.data.id);
            this.router.navigate(['/admin/supplier'])
          }
        }
      })
    } else {
      console.error('Form is invalid');
      alert('Please fill out the form correctly.');
    }
  }
}
