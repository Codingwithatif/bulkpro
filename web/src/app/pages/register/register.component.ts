import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IStore, IUser, UserRole } from '../../models/auth.model';

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
  isStore = false; // Flag to show store fields

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      role: ['', Validators.required],
      martName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      storeName: [''],
      ownerName: [''],
      storeAddress: [''],
      storeRegistration: ['']
    });
  }

  onRoleChange(event: any) {
    const role = event.target.value;
    this.isStore = role === this.userRole.MART;

    if (this.isStore) {
      this.registerForm.get('storeName')?.setValidators(Validators.required);
      this.registerForm.get('ownerName')?.setValidators(Validators.required);
      this.registerForm.get('storeAddress')?.setValidators(Validators.required);
    } else {
      this.registerForm.get('storeName')?.clearValidators();
      this.registerForm.get('ownerName')?.clearValidators();
      this.registerForm.get('storeAddress')?.clearValidators();
    }

    this.registerForm.get('storeName')?.updateValueAndValidity();
    this.registerForm.get('ownerName')?.updateValueAndValidity();
    this.registerForm.get('storeAddress')?.updateValueAndValidity();
  }

  registerMart() {
    const formValue = this.registerForm.value;
    const store: IStore = {
      storeName: formValue.storeName
    }
    const user: IUser = {
      name: formValue.martName,
      password: formValue.password,
      email: formValue.email,
      address: formValue.address,
      phoneNumber: formValue.phone,
      role: formValue.role,
      store: store
    };

    this.authService.register(user).subscribe(response => {
      console.log(response);
      this.router.navigate(['/login']);
    });
  }
}
