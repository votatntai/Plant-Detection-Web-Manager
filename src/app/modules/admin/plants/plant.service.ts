import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from 'app/types/plant.type';
import { Pagination } from 'app/types/pagination.type';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlantService {

    private baseUrl = environment.baseUrl;

    private _plant: BehaviorSubject<Plant | null> = new BehaviorSubject(null);
    private _plants: BehaviorSubject<Plant[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for plant
 */
    get plant$(): Observable<Plant> {
        return this._plant.asObservable();
    }

    /**
     * Getter for plants
     */
    get plants$(): Observable<Plant[]> {
        return this._plants.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<Pagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get plants
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getPlants(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search?: string, status?: string):
        Observable<{ pagination: Pagination; data: Plant[] }> {
        return this._httpClient.get<{ pagination: Pagination; data: Plant[] }>(this.baseUrl + '/api/plants', {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                sort,
                order,
                ...(status !== undefined && { status }),
                ...(search !== undefined && search !== null && { name: search }),
            }
        }).pipe(
            tap((response) => {
                console.log(response);

                this._pagination.next(response.pagination);
                this._plants.next(response.data);
            }),
        );
    }

    /**
* Create plant
*/
    createPlant(data) {
        const headers = new HttpHeaders({
            'Content-Type': 'multipart/form-data', // Cấu hình content type ở đây
        });

        return this.plants$.pipe(
            take(1),
            switchMap((plants) => this._httpClient.post<Plant>(this.baseUrl + '/api/plants', data).pipe(
                map((newPlant) => {

                    // Update plant list with current page size
                    this._plants.next([newPlant, ...plants].slice(0, this._pagination.value.pageSize));

                    return newPlant;
                })
            ))
        )
    }

    /**
* Get plant by id
*/
    getPlant(id: string) {
        return this._httpClient.get<Plant>(this.baseUrl + '/api/plants/' + id).pipe(tap((response) => {
            this._plant.next(response);
        }))
    }

    /**
    * Update plant
    */
    updatePlant(id: string, data) {
        return this.plants$.pipe(
            take(1),
            switchMap((plants) => this._httpClient.put<Plant>(this.baseUrl + '/api/plants/' + id, data).pipe(
                map((updatedPlant) => {

                    // Find and replace updated plant
                    const index = plants.findIndex(item => item.id === id);
                    plants[index] = updatedPlant;
                    this._plants.next(plants);

                    // Update plant
                    this._plant.next(updatedPlant);

                    return updatedPlant;
                })
            ))
        )
    }

    /**
* Approve plant
*/
    approvePlant(id: string) {
        return this.plants$.pipe(
            take(1),
            switchMap((plants) => this._httpClient.put<Plant>(this.baseUrl + '/api/plants/' + id, { status: 'In Progress' }).pipe(
                map((updatedPlant) => {

                    // Find and replace updated plant
                    const index = plants.findIndex(item => item.id === id);
                    plants[index] = updatedPlant;
                    this._plants.next(plants);

                    // Update plant
                    this._plant.next(updatedPlant);

                    return updatedPlant;
                })
            ))
        )
    }

    /**
* Reject plant
*/
    rejectPlant(id: string, note: string) {
        return this.plants$.pipe(
            take(1),
            switchMap((plants) => this._httpClient.put<Plant>(this.baseUrl + '/api/plants/' + id, { status: 'Rejected', note: note }).pipe(
                map((updatedPlant) => {

                    // Find and replace updated plant
                    const index = plants.findIndex(item => item.id === id);
                    plants[index] = updatedPlant;
                    this._plants.next(plants);

                    // Update plant
                    this._plant.next(updatedPlant);

                    return updatedPlant;
                })
            ))
        )
    }
}