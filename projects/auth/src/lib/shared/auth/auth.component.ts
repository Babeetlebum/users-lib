import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { User } from "../../models/index";

import { AuthService, LoginRequestVariables, SignupRequestVariables } from "../../services/index";
const PASSWORD_VALIDATOR = [Validators.required, Validators.minLength(6)];

@Component({
    providers: [AuthService],
    selector: "app-auth",
    styleUrls: ["./auth.component.sass"],
    templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
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

    protected isSignup: boolean = false;
    protected user: User;
    protected hidePassword: boolean = true;
    protected hideConfirmPassword: boolean = true;
    protected redirectUrl: string = "/";

    public constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

    public ngOnInit() {
        // detect whether it is a signup or a login page
        this.isSignup = this.router.url.includes("signup");

        // reset login status
        this.authService.logout();

        // store the redirection rrl to use after login completes
        this.redirectUrl = this.route.snapshot.queryParams.redirectUrl || "/";
    }

    protected onSubmit() {
        if (this.isSignup) {
            this.signup();
        } else {
            this.login();
        }
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

    protected onCancel() {
        const urlTo = this.isSignup ? "login" : "signup";
        this.router.navigateByUrl(urlTo);
    }

    protected checkPasswordMatch() {
        if (this.signupForm.controls.password == null || this.signupForm.controls.confirmPassword == null) {
            return false;
        }
        return this.signupForm.controls.password.value === this.signupForm.controls.confirmPassword.value;
    }
}
