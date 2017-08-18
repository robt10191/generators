import { Component, ChangeDetectionStrategy, Injector, ViewContainerRef, ViewChild } from '@angular/core';
import { LoginPageBaseComponent } from '../base/<%= data.pageName %>.component';

@Component({
    selector: '<%= data.pageName %>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./<%= data.pageName %>.component.scss'],
    templateUrl: './<%= data.pageName %>.component.html'
})
export class <%= data.pageClassName %>Component extends <%= data.pageClassName %>BaseComponent {
    constructor() {
        super();
    }
<% if (data.defaultMethods) { %><% data.defaultMethods.forEach(function (method) { %>
    <%= method %>() { } <% }); %>
<% } %>
}
