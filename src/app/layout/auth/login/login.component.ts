import {Component, computed, inject, Signal} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatButton} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {AuthService} from '../../../services/auth.service';
import {map} from 'rxjs';
import {IAuthResponse} from '../../../interfaces/responses/auth/auth-response';

@Component({
  selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButton
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    private readonly _authService = inject(AuthService);
    private readonly _router = inject(Router);

    public readonly isInvalidState: Signal<boolean> = computed(() => {
        return this.formStatusChanges() != 'VALID';
    });

    public loginForm: FormGroup = new FormGroup({
        email: new FormControl<string>("", [Validators.required, Validators.email]),
        password: new FormControl<string>("", [Validators.required])
    });

    public formStatusChanges = toSignal(this.loginForm.statusChanges);

    public get email(): FormControl {
        return this.loginForm.controls['email'] as FormControl;
    }

    public get password(): FormControl {
        return this.loginForm.controls['password'] as FormControl;
    }

    public login() {
        if (this.isInvalidState()) return;

        this._authService.login(this.loginForm.value).subscribe({
            next: result => {
                this._authService.updateAuthData(result.accessToken);
            }
        });
    }
}
