import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ILoginRequest} from '../interfaces/requests/auth/login-request';
import {IAuthResponse} from '../interfaces/responses/auth/auth-response';
import {IAuthData} from '../interfaces/auth-data';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly _http = inject(HttpClient);
    private readonly _router = inject(Router);

    private readonly _apiPath = '/api/v1.0/auth';

    private readonly _accessToken = signal<string>(localStorage.getItem('access-token') ?? '');

    private readonly _authData = computed<IAuthData | undefined>(() => {
        if (!this.accessToken()) return undefined;

        const base64Url = this.accessToken().split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const json = window.atob(base64);
        const payload = JSON.parse(json);

        return {
            email: payload.email,
            name: payload.username
        };
    });

    public readonly isAuthorized = computed(() => {
        return !!this._authData();
    });

    public readonly authData = computed(() => {
        return this._authData();
    });

    public readonly accessToken = computed(() => {
        return this._accessToken();
    });

    constructor() {
        effect(() => {
            localStorage.setItem('access-token', this._accessToken());
        });
    }

    public signIn(request: ILoginRequest): Observable<void> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._http.post<IAuthResponse>(`${this._apiPath}/sign-in`, JSON.stringify(request), {headers: headers}).pipe(
            map(authResponse => {
                this._accessToken.set(authResponse.accessToken);
                this._router.navigate(['/']).then(() => {});
            }),
        );
    }

    public signOut(): void {
        this._accessToken.set('');
        this._router.navigate(['auth', 'sign-in']).then(() => {});
    }
}
