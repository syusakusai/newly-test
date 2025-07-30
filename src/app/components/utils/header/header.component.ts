import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  get isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  get email(): string | null {
    return localStorage.getItem('email');
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    window.location.reload();
  }
}
