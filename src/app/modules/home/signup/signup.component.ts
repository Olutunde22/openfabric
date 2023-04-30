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
  loading: boolean = false
  errorMessage!: string

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
    })
  }

  signUp(): void {
    this.loading = true
    this.authService.signUp({
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
      firstName: this.signupForm.get('firstName')?.value,
      lastName: this.signupForm.get('lastName')?.value
    }).subscribe({
      next: (signupData) => {
        this.authService.addToken(signupData.data)
        this.router.navigateByUrl('/dashboard')
        this.signupForm.reset()
        this.loading = false
      },
      error: (error) => {
        this.errorMessage = error.error.message
        this.loading = false
        setTimeout(() => {
          this.errorMessage = ''
        }, 3000)
      },
    })
  }
}
