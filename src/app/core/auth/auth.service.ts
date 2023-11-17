import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment.development';
import { GoogleAuthProvider } from 'firebase/auth';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { User } from '../user/user.types';


@Injectable({ providedIn: 'root' })
export class AuthService {

    baseUrl = environment.baseUrl;

    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        public afAuth: AngularFireAuth
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('api/auth/sign-in', credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            }),
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken,
        }).pipe(
            catchError(() =>

                // Return false
                of(false),
            ),
            switchMap((response: any) => {
                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if (response.accessToken) {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            }),
        );
    }

    /**
 * Sign in using the access token
 */
    signInUsingGoogleIdToken(idToken: string): Observable<any> {
        // Sign in using the token
        return this._httpClient.post(this.baseUrl + '/api/auth/google/manager', { idToken: idToken }).pipe(
            catchError(() =>
                // Return false
                of(false),
            ),
            switchMap((response: any) => {
                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.

                if (response.accessToken) {
                    this.accessToken = response.accessToken;
                }

                this.getUser().subscribe(user => {
                    if (user) {
                        // Set the authenticated flag to true
                        this._authenticated = true;
                        // Return true
                        return of(true);
                    }
                });

                // Return false
                return of(false);
            }),
        );
    }

    getUser(): Observable<any> {
        // Sign in using the token
        return this._httpClient.get<User>(this.baseUrl + '/api/managers/information').pipe(
            catchError(() =>
                // Return false
                of(false),
            ),
            switchMap((user: User) => {
                this._userService.user = user;
                // Return true
                return of(true);
            }),
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.getUser();
    }

    // Sign in with Google
    googleAuth(): Observable<any> {
        return this.authLogin(new GoogleAuthProvider());
    }

    // Auth logic to run auth providers
    authLogin(provider): Observable<any> {
        return new Observable((observer) => {
            this.afAuth
                .signInWithPopup(provider)
                .then((result) => {
                    result.user.getIdToken().then((token) => {
                        this.signInUsingGoogleIdToken(token).subscribe(
                            (data) => {
                                observer.next(data); // Gửi dữ liệu đến observer khi xong
                                observer.complete(); // Kết thúc observable
                            },
                            (error) => {
                                observer.error(error); // Gửi lỗi đến observer nếu có lỗi
                            }
                        );
                    });
                })
                .catch((error) => {
                    observer.error(error); // Gửi lỗi đến observer nếu có lỗi
                });
        });
    }
}
