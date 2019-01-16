import { Routes } from "@angular/router";

import { AuthComponent, AuthGuard } from "projects/auth/src/public_api";

import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
    {
        canActivate: [AuthGuard],
        component: HomeComponent,
        path: "home",
    },
    {
        component: AuthComponent,
        path: "login",
    },
    {
        component: AuthComponent,
        path: "signup",
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: "home",
    },
    {
        path: "**",
        redirectTo: "home",
    },
];
