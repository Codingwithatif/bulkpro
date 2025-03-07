import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IUser, UserRole } from '../../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  router = inject(Router);
  http = inject(HttpClient);

  authService = inject(AuthService);
  loading: boolean = false; 
  userRole = UserRole;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      role: ['', Validators.required],
      name: ['Mart', Validators.required], // martName will be the username
      email: ['Mart@aaa.com', [Validators.required, Validators.email]],
      phoneNumber: ['1122345668897', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]], // Updated pattern for phone numbers
      address: ['Mart', Validators.required],
      password: ['password', [Validators.required, Validators.minLength(6)]],
      martId: [''], // Added martId
      companyId: [''] // Added companyId
    });
  }

  /**
   * Registers the user and navigates to the login page upon success.
   */
  registerMart() {
    const formValue = this.registerForm.value;
    const user: IUser = {
      name: formValue.name,
      password: formValue.password,
      email: formValue.email,
      address: formValue.address,
      phoneNumber: formValue.phoneNumber,
      role: formValue.role,
      martId: formValue.role === UserRole.MART ? formValue.martId : undefined,
      companyId: formValue.role === UserRole.COMPANY ? formValue.companyId : undefined
    }
    this.authService.register(user).subscribe(a => {
      console.log(a)
    })
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    this.registerMart();
  }

  /**
   * Returns a user-friendly error message based on Firebase error codes.
   * @param error Firebase error object
   * @returns string
   */
  getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already in use. Please try logging in.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/weak-password':
        return 'The password is too weak.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}
