export class ApiConstants {

    public static get baseUrl(): string {
        return 'http://localhost:8081/api/'
    }

    public static get baseSignIn(): string {
        return this.baseUrl + 'login/signin'
    }

    public static get baseLogin(): string {
        return this.baseUrl + 'login'
    }
}
