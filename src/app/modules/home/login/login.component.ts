import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  loading: boolean = false
  error: boolean = false

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard')
    }
    this.loginForm = this.fb.group({
      email: ['', { validators: [Validators.email, Validators.required] }],
      password: ['', { validators: [Validators.required] }],
    })
  }

  login(): void {
    this.loading = true
    this.error = false
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe({
      next: (loggedIn) => {
        this.authService.addToken(loggedIn.data)
        this.router.navigateByUrl('/dashboard')
        this.loginForm.reset()
        this.loading = false
      },
      error: () => {
        this.error = true
        this.loading = false
        setTimeout(() => {
          this.error = false
        }, 3000)
      },
    })
  }
}
