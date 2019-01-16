import { ModuleWithProviders, NgModule } from "@angular/core";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CommonModule } from "@angular/common";

import { ReactiveFormsModule } from "@angular/forms";

import { FlexLayoutModule } from "@angular/flex-layout";

import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
} from "@angular/material";

import { AuthComponent } from "./auth.component";
import { GraphQLModule } from "./graphql/graphql.module";
import { AuthGuard } from "./guards/auth.guard";
import { LoginSignupComponent } from "./login-signup/login-signup.component";
import { AUTH_GRAPHQL_CONFIG, IGraphQLConfig } from "./models/graphql-config";

@NgModule({
    declarations: [AuthComponent, LoginSignupComponent],
    exports: [AuthComponent],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        FlexLayoutModule,
        GraphQLModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
    ],
    providers: [AuthGuard],
})
export class AuthModule {
    public static forRoot(authGraphQLConfig: IGraphQLConfig): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [{ provide: AuthGuard }, { provide: AUTH_GRAPHQL_CONFIG, useValue: authGraphQLConfig }],
        };
    }
}
