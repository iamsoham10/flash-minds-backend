import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: "", component: AppComponent },
    { path: "auth", loadComponent: () => import("./components/signup/signup.component").then((c) => c.SignupComponent) },
    { path: "dashboard", loadComponent: () => import("./components/dashboard/dashboard.component").then((c) => c.DashboardComponent), canActivate: [authGuard] }
];
