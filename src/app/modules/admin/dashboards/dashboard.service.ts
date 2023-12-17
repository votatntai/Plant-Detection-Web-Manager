import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from 'app/types/dashboard.type';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    baseUrl = environment.baseUrl;

    private _data: BehaviorSubject<Dashboard> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any> {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<Dashboard> {
        return this._httpClient.get(this.baseUrl + '/api/dashboards/managers').pipe(
            tap((response: Dashboard) => {
                this._data.next(response);
            }),
        );
    }
}
