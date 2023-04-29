import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard')
    }
    this.signupForm = this.fb.group({
      firstName: ['', { validators: [Validators.required, Validators.minLength(3)] }],
      lastName: ['', { validators: [Validators.required, Validators.minLength(3)] }],
      email: ['', { validators: [Validators.email, Validators.required] }],
      password: ['', { validators: [Validators.required, Validators.minLength(7)] }],
    }, { updateOn: 'blur' })
  }

  signUp(): void {
    const success = this.authService.signUp({
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
      firstName: this.signupForm.get('firstName')?.value,
      lastName: this.signupForm.get('lastName')?.value
    })
    if (success) {
      this.router.navigateByUrl('/dashboard')
      this.signupForm.reset()
    }
  }
}
