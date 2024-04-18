import {Component, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../../../service/login.service";
import {TokenVO} from "../../../model/TokenVO";
import {UserCredentialsVO} from "../../../model/UserCredentialsVO";

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

    constructor(public layoutService: LayoutService, private loginService: LoginService) {
    }

    ngOnInit(): void {
        this.token = new TokenVO();
        this.userCredentials = new UserCredentialsVO();
    }

    signIn() {

        this.loginService.signIn(this.userCredentials).subscribe({
            next: data => {
                this.token = <TokenVO>data;
                localStorage.setItem("token", this.token.accessToken);
            }, error() {
                console.error("Login Failed. Try Again");
            }
        })
    }


}
