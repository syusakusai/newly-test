import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private dummyUser = {
    email: 'mandiri@wahyu.com',
    password: 'wahyu123',
  };

  login(email: string, password: string): boolean {
    return (
      email === this.dummyUser.email && password === this.dummyUser.password
    );
  }
}
