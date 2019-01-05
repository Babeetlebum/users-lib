import { NgModule } from "@angular/core";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink, HttpLinkModule } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const uri = "http://localhost:8099";
export function createApollo(httpLink: HttpLink) {
    return {
        cache: new InMemoryCache(),
        link: httpLink.create({ uri }),
    };
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            deps: [HttpLink],
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
        },
    ],
})
export class GraphQLModule {}
