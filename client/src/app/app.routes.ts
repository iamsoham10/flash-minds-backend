import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: "", component: AppComponent },
    { path: "auth", loadComponent: () => import("./components/signup/signup.component").then((c) => c.SignupComponent) }
];
