import { InjectionToken } from "@angular/core";

export interface IGraphQLConfig {
    apiEndpoint: string;
}

export const AUTH_GRAPHQL_CONFIG = new InjectionToken<IGraphQLConfig>("auth.graphql.config");
