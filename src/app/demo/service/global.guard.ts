import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {inject} from "@angular/core";
import {LoginService} from "./login.service";
import {catchError, Observable} from "rxjs";
import {map} from "rxjs/operators";

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
    const loginService = inject(LoginService);
    const router = inject(Router);
    return loginService.isAuthenticated().pipe(
        map(isAuthenticated => {
            return isAuthenticated ? true : router.createUrlTree(['']);
        }),
        catchError(error => {
            console.log('Token Inválido!', error);
            return [router.createUrlTree([''])];  // Redireciona em caso de erro
        })
    );
};
