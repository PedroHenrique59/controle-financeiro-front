import {Component, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {LoginService} from "../../service/login.service";
import {TokenVO} from "../../model/TokenVO";
import {UserCredentialsVO} from "../../model/UserCredentialsVO";
import {Router} from "@angular/router";
import {co} from "@fullcalendar/core/internal-common";

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

    valCheck: string[] = ['remember'];

    userCredentials: UserCredentialsVO;
    token: TokenVO;

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
        this.loginService.signIn(this.userCredentials).subscribe({
            next: data => {
                this.token = <TokenVO>data;
                localStorage.setItem('token', this.token.accessToken);
                this.router.navigate(['dashboard']);
            }, error() {
                alert("Login falhou! Tente Novamente");
                console.error("Login falhou! Tente Novamente");
            }
        })
    }

    isAuthenticated() {
        return this.loginService.isAuthenticated().subscribe({
            next: data => {
                data.body.result === true ? this.router.navigate(['dashboard']) : this.router.navigate(['']);
            },
            error: erro => {
                console.log('Token Inválido!');
            }
        })
    }
}
