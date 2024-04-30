import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiConstants} from "../constants/api-constants";
import {UserCredentialsVO} from "../model/UserCredentialsVO";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {
    }

    signIn(userCredentials: UserCredentialsVO): Observable<any> {
        return this.http.post(ApiConstants.baseLogin, userCredentials);
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('token') != null;
    }

}

