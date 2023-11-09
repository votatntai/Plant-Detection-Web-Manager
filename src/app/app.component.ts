import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'environments/environment.development';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        RouterOutlet,
    ],
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor() {
    }
}
