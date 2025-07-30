import { Component } from '@angular/core';
import { LoginService } from './login-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  email = '';
  password = '';
  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    const isValid = this.loginService.login(this.email, this.password);
    if (isValid) {
      localStorage.setItem('email', this.email);
      localStorage.setItem('isLoggedIn', 'true');
      alert('Login successful!');
      this.router.navigate(['/employee']);
    } else {
      alert('Invalid credentials');
    }
  }
}
