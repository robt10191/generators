import { Component, ChangeDetectionStrategy, Injector, ViewContainerRef, ViewChild } from '@angular/core';
import { LoginPageBaseComponent } from '../base/login-page.component';

@Component({
    selector: 'login-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./login-page.component.scss'],
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent extends LoginPageBaseComponent {
    constructor() {
        super();
    }
}
