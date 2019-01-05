import { EventEmitter, Injectable } from "@angular/core";

import { IUser, User } from "../../models/index";

import { LoginRequestGQL, LoginRequestVariables, SignupRequestGQL, SignupRequestVariables } from "../../services/index";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    public isConnected$: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private loginService: LoginRequestGQL, private signupService: SignupRequestGQL) {}

    public signup(signupForm: SignupRequestVariables): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.signupService
                .mutate(signupForm)
                .toPromise()
                .then((result) => {
                    try {
                        const user = new User(this.mapForSignup(result));

                        return resolve(user);
                    } catch (e) {
                        reject(e);
                    }
                })
                .catch(reject);
        });
    }

    public login(loginForm: LoginRequestVariables): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.loginService
                .mutate(loginForm)
                .toPromise()
                .then((result) => {
                    try {
                        const user = new User(this.mapForLogin(result));
                        if (user && user.token) {
                            this.isConnected$.emit(true);
                            localStorage.setItem("currentUser", JSON.stringify(user));
                        }
                        return resolve(user);
                    } catch (e) {
                        reject(e);
                    }
                })
                .catch(reject);
        });
    }

    public logout() {
        this.isConnected$.emit(false);
        localStorage.removeItem("currentUser");

        return true;
    }

    public isConnected() {
        return localStorage.getItem("currentUser") != null;
    }

    protected mapForSignup(result: any): IUser {
        return {
            email: result.data.signup.user.email,
            id: result.data.signup.user.id,
            token: result.data.signup.token,
            username: result.data.signup.user.name,
        };
    }

    protected mapForLogin(result: any): IUser {
        return {
            email: result.data.login.user.email,
            id: result.data.login.user.id,
            token: result.data.login.token,
            username: result.data.login.user.name,
        };
    }
}
