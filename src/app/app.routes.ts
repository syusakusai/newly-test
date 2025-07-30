import { Routes } from '@angular/router';

import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployePageComponent } from './components/admins/employe-page/employe-page.component';
export const routes: Routes = [
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'employee',
    component: EmployePageComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: HomePageComponent },
];
