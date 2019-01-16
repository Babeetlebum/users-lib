import { ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";

import { CommonModule } from "@angular/common";

import { RouterModule } from "@angular/router";

import { HttpClientModule } from "@angular/common/http";

import { CoreRoutingModule } from "./core-routing.module";

import { AuthGuard, AuthModule } from "projects/auth/src/public_api";
import { authGraphQLConfig } from "./auth-config/auth-graphql-config";
import { HomeComponent } from "./home/home.component";

@NgModule({
    declarations: [HomeComponent],
    exports: [RouterModule],
    imports: [CommonModule, CoreRoutingModule, AuthModule.forRoot(authGraphQLConfig), HttpClientModule],
    providers: [AuthGuard],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error("CoreModule is already loaded. Import it in the AppModule only");
        }
    }
}
