import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard')
    }
    this.loginForm = this.fb.group({
      email: ['', { validators: [Validators.email, Validators.required] }],
      password: ['', { validators: [Validators.required] }],
    }, { updateOn: 'blur' })
  }

  login(): void {
    if (this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)) {
      this.router.navigateByUrl('/dashboard')
      this.loginForm.reset()
    }
  }
}
