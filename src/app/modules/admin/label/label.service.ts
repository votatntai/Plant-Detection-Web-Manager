import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Label } from 'app/types/label.type';
import { Pagination } from 'app/types/pagination.type';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LabelService {

    private baseUrl = environment.baseUrl;

    private _label: BehaviorSubject<Label | null> = new BehaviorSubject(null);
    private _labels: BehaviorSubject<Label[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for label
 */
    get label$(): Observable<Label> {
        return this._label.asObservable();
    }

    /**
     * Getter for labels
     */
    get labels$(): Observable<Label[]> {
        return this._labels.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<Pagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get labels
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getLabels(pageNumber: number = 0, pageSize: number = 10, search?: string):
        Observable<{ pagination: Pagination; data: Label[] }> {
        return this._httpClient.get<{ pagination: Pagination; data: Label[] }>(this.baseUrl + '/api/labels', {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                ...(search !== undefined && search !== null && { name: search }),
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._labels.next(response.data);
            }),
        );
    }

    /**
* Create label
*/
    createLabel(data) {
        return this.labels$.pipe(
            take(1),
            switchMap((labels) => this._httpClient.post<Label>(this.baseUrl + '/api/labels', data).pipe(
                map((newLabel) => {

                    // Update label list with current page size
                    this._labels.next([newLabel, ...labels].slice(0, this._pagination.value.pageSize));

                    return newLabel;
                })
            ))
        )
    }

    /**
* Get label by id
*/
    getLabel(id: string) {
        return this._httpClient.get<Label>(this.baseUrl + '/api/labels/' + id).pipe(tap((response) => {
            this._label.next(response);
        }))
    }

    /**
    * Update label
    */
    updateLabel(id: string, data) {
        return this.labels$.pipe(
            take(1),
            switchMap((labels) => this._httpClient.put<Label>(this.baseUrl + '/api/labels/' + id, data).pipe(
                map((updatedLabel) => {

                    // Find and replace updated label
                    const index = labels.findIndex(item => item.id === id);
                    labels[index] = updatedLabel;
                    this._labels.next(labels);

                    // Update label
                    this._label.next(updatedLabel);

                    return updatedLabel;
                })
            ))
        )
    }

}