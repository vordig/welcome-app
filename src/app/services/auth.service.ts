import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILoginRequest} from '../interfaces/requests/auth/login-request';
import {IAuthResponse} from '../interfaces/responses/auth/auth-response';
import {IAuthData} from '../interfaces/auth-data';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly _http = inject(HttpClient);

    private readonly _apiPath = '/api/v1.0/auth';

    private readonly _accessToken = signal<string>('');
    private readonly _authData = signal<IAuthData | undefined>(undefined);

    public readonly isAuthorized = computed(() => {
        return !!this._authData();
    });

    public readonly authData = computed(() => {
        return this._authData();
    });

    public readonly accessToken = computed(() => {
        return this._accessToken();
    });

    public login(request: ILoginRequest): Observable<IAuthResponse> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this._http.post<IAuthResponse>(`${this._apiPath}/login`, JSON.stringify(request), {headers: headers});
    }

    public updateAuthData(accessToken: string): void {
        this._accessToken.set(accessToken);

        const base64Url = accessToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const json = window.atob(base64);
        const payload = JSON.parse(json);

        this._authData.set({
            email: payload.email,
            name: payload.name
        });
    }
}
