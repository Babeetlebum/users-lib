import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";

import { FlexLayoutModule } from "@angular/flex-layout";

import { GraphQLModule } from "./graphql.module";

import { AuthGuard } from "./guards/index";

import { AuthComponent } from "./shared/index";

import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
} from "@angular/material";

@NgModule({
    declarations: [AuthComponent],
    exports: [AuthComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        GraphQLModule,
        MatButtonModule,
        MatDividerModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
    ],
    providers: [AuthGuard],
})
export class AuthModule {}
