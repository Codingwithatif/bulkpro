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
  styleUrls: ['./login.component.scss'] // Fixed typo here, should be styleUrls
})
export class LoginComponent {
  loginForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  loading: boolean = false; // Loader state

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['faisal1@gmail.com', [Validators.required, Validators.email]],
      password: ['password', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true; // Show loader
      const { email, password } = this.loginForm.value;
      const user = {
        email: email,
        password: password
      }
      this.http.post<IGenericResponse<IUser>>('http://localhost:3000/user/login', user).subscribe(resp => {
        if(resp.status === HttpStatusCode.Ok) {
          if(resp.data.role === UserRole.MART ) {
            this.router.navigate(['/admin/consumer'])
          } else if(resp.data.role === UserRole.COMPANY ) {
            this.router.navigate(['/admin/supplier'])
          }
        }
      })
      // this.authService.login(email, password).subscribe({
      //   next: (userData) => {
      //     console.log('Login successful, user role:', userData.role);
      //     //a statemnet for this 
      //     if (userData.role === 'Mart') {
      //       this.router.navigate(['/admin/consumer/dashboard']);
      //     } else if (userData.role === 'Company') {
      //       this.router.navigate(['/admin/supplier/dashboard']);
      //     } else {
      //       console.error('Unknown role:', userData.role);
      //     }
      //     this.loading = false; // Hide loader after successful login
      //   },
      //   error: (error) => {
      //     console.error('Login error:', error);
      //     alert('Login failed. Please check your credentials.');
      //     this.loading = false; // Hide loader on error
      //   }
      // });
    } else {
      console.error('Form is invalid');
      alert('Please fill out the form correctly.');
    }
  }
}