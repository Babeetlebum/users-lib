import { Inject, NgModule } from "@angular/core";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink, HttpLinkModule } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { AUTH_GRAPHQL_CONFIG, IGraphQLConfig } from "../models/index";

export function createApollo(httpLink: HttpLink, authGraphQLConfig: IGraphQLConfig) {
    return {
        cache: new InMemoryCache(),
        link: httpLink.create({ uri: authGraphQLConfig.apiEndpoint }),
    };
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            deps: [HttpLink, [new Inject(AUTH_GRAPHQL_CONFIG)]],
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
        },
    ],
})
export class GraphQLModule {}
