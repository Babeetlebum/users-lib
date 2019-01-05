export type Maybe<T> = T | null;

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
    providedIn: "root",
})
export class LoginRequestGQL extends Apollo.Mutation<LoginRequestMutation, LoginRequestVariables> {
    document: any = gql`
        mutation LoginRequest($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                token
                user {
                    id
                    name
                    email
                }
            }
        }
    `;
}
@Injectable({
    providedIn: "root",
})
export class SignupRequestGQL extends Apollo.Mutation<SignupRequestMutation, SignupRequestVariables> {
    document: any = gql`
        mutation SignupRequest($username: String!, $email: String!, $password: String!) {
            signup(email: $email, password: $password, name: $username) {
                token
                user {
                    id
                    name
                    email
                }
            }
        }
    `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================

// ====================================================
// Documents
// ====================================================

export type LoginRequestVariables = {
    email: string;
    password: string;
};

export type LoginRequestMutation = {
    __typename?: "Mutation";

    login: LoginRequestLogin;
};

export type LoginRequestLogin = {
    __typename?: "AuthPayload";

    token: Maybe<string>;

    user: Maybe<LoginRequestUser>;
};

export type LoginRequestUser = {
    __typename?: "User";

    id: string;

    name: string;

    email: string;
};

export type SignupRequestVariables = {
    username: string;
    email: string;
    password: string;
};

export type SignupRequestMutation = {
    __typename?: "Mutation";

    signup: SignupRequestSignup;
};

export type SignupRequestSignup = {
    __typename?: "AuthPayload";

    token: Maybe<string>;

    user: Maybe<SignupRequestUser>;
};

export type SignupRequestUser = {
    __typename?: "User";

    id: string;

    name: string;

    email: string;
};
