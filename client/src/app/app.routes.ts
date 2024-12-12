import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: "", loadComponent: () => import("./components/landing-page/landing-page.component").then((c) => c.LandingPageComponent) },
    { path: "auth", loadComponent: () => import("./components/signup/signup.component").then((c) => c.SignupComponent) },
    { path: "dashboard", loadComponent: () => import("./components/dashboard/dashboard.component").then((c) => c.DashboardComponent), canActivate: [authGuard] }
];
