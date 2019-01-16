import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { User } from "../models/user";

import { AuthService } from "../services/auth/auth.service";
import { LoginRequestVariables, SignupRequestVariables } from "../services/graphql/graphql.service";

const PASSWORD_VALIDATOR = [Validators.required, Validators.minLength(6)];

@Component({
    providers: [AuthService],
    selector: "ul-login-signup",
    styleUrls: ["./login-signup.component.sass"],
    templateUrl: "./login-signup.component.html",
})
export class LoginSignupComponent implements OnInit {
    public signupForm = new FormGroup({
        confirmPassword: new FormControl("", PASSWORD_VALIDATOR),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", PASSWORD_VALIDATOR),
        username: new FormControl("", [Validators.required, Validators.minLength(4)]),
    });

    public loginForm = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", PASSWORD_VALIDATOR),
    });

    public isSignup: boolean = false;
    public user: User;
    public hidePassword: boolean = true;
    public hideConfirmPassword: boolean = true;
    public redirectUrl: string = "/";
    public showSpinner: boolean = false;

    public constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

    public ngOnInit() {
        // detect whether it is a signup or a login page
        this.isSignup = this.route.snapshot.url[0].path === "signup";

        // reset login status
        this.authService.logout();

        // store the redirection rrl to use after login completes
        this.redirectUrl = this.route.snapshot.queryParams.redirectUrl || "/";
    }

    public onSubmit() {
        this.showSpinner = true;
        if (this.isSignup) {
            this.signup();
        } else {
            this.login();
        }
        this.showSpinner = false;
    }

    public onCancel() {
        const urlTo = this.isSignup ? "login" : "signup";
        this.router.navigateByUrl(urlTo);
    }

    protected signup() {
        const authForm: SignupRequestVariables = {
            email: this.signupForm.controls.email.value,
            password: this.signupForm.controls.password.value,
            username: this.signupForm.controls.username.value,
        };
        this.authService
            .signup(authForm)
            .then(() => {
                console.log("show 'account created with success' message");
                this.router.navigateByUrl("/login");
            })
            .catch(console.warn);
    }

    protected login() {
        const authForm: LoginRequestVariables = {
            email: this.loginForm.controls.email.value,
            password: this.loginForm.controls.password.value,
        };
        this.authService
            .login(authForm)
            .then(() => {
                console.log("show welcome messaage");
                this.router.navigateByUrl(this.redirectUrl);
            })
            .catch(console.warn);
    }

    protected checkPasswordMatch() {
        if (this.signupForm.controls.password == null || this.signupForm.controls.confirmPassword == null) {
            return false;
        }
        return this.signupForm.controls.password.value === this.signupForm.controls.confirmPassword.value;
    }
}
