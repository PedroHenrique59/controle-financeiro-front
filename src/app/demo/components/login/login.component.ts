import {Component, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {LoginService} from "../../service/login.service";
import {TokenVO} from "../../model/TokenVO";
import {UserCredentialsVO} from "../../model/UserCredentialsVO";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {

    userCredentials: UserCredentialsVO;
    token: TokenVO;

    loading: boolean = true;

    constructor(public layoutService: LayoutService,
                private loginService: LoginService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.token = new TokenVO();
        this.userCredentials = new UserCredentialsVO();
        this.isAuthenticated();
    }

    signIn() {
        this.loading = true;
        this.loginService.signIn(this.userCredentials).subscribe({
            next: data => {
                this.token = <TokenVO>data;
                localStorage.setItem('token', this.token.accessToken);
                this.router.navigate(['dashboard']);
            }, error: error => {
                alert("Login falhou! Tente Novamente");
                this.loading = false;
                this.router.navigate(['']);
            }, complete: () => {
                this.loading = false;
            }
        })
    }

    isAuthenticated() {
        return this.loginService.isAuthenticated().subscribe({
            next: data => {
                this.loading = true;
                data === true ? this.router.navigate(['dashboard']) : this.router.navigate(['']);
            },
            error: () => {
                console.log('Token Inválido!');
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            }
        })
    }
}
