import { BrowserModule } from "@angular/platform-browser";

import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, CoreModule],
    providers: [],
})
export class AppModule {}
