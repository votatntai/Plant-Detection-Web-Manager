import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from 'app/types/pagination.type';
import { Report } from 'app/types/report.type';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {

    private baseUrl = environment.baseUrl;

    private _report: BehaviorSubject<Report | null> = new BehaviorSubject(null);
    private _reports: BehaviorSubject<Report[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for report
 */
    get report$(): Observable<Report> {
        return this._report.asObservable();
    }

    /**
     * Getter for reports
     */
    get reports$(): Observable<Report[]> {
        return this._reports.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<Pagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get reports
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getReports(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search?: string, status?: string):
        Observable<{ pagination: Pagination; data: Report[] }> {
        return this._httpClient.get<{ pagination: Pagination; data: Report[] }>(this.baseUrl + '/api/reports', {
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
                this._pagination.next(response.pagination);
                this._reports.next(response.data);
            }),
        );
    }

    /**
* Create report
*/
    createReport(data) {
        return this.reports$.pipe(
            take(1),
            switchMap((reports) => this._httpClient.post<Report>(this.baseUrl + '/api/reports', data).pipe(
                map((newReport) => {

                    // Update report list with current page size
                    this._reports.next([newReport, ...reports].slice(0, this._pagination.value.pageSize));

                    return newReport;
                })
            ))
        )
    }

    /**
* Get report by id
*/
    getReport(id: string) {
        return this._httpClient.get<Report>(this.baseUrl + '/api/reports/' + id).pipe(tap((response) => {
            this._report.next(response);
        }))
    }

    /**
    * Update report
    */
    updateReport(id: string, data) {
        return this.reports$.pipe(
            take(1),
            switchMap((reports) => this._httpClient.put<Report>(this.baseUrl + '/api/reports/' + id, data).pipe(
                map((updatedReport) => {

                    // Find and replace updated report
                    const index = reports.findIndex(item => item.id === id);
                    reports[index] = updatedReport;
                    this._reports.next(reports);

                    // Update report
                    this._report.next(updatedReport);

                    return updatedReport;
                })
            ))
        )
    }

    /**
* Approve report
*/
    approveReport(id: string) {
        return this.reports$.pipe(
            take(1),
            switchMap((reports) => this._httpClient.put<Report>(this.baseUrl + '/api/reports/' + id, { status: 'Approved' }).pipe(
                map((updatedReport) => {

                    // Find and replace updated report
                    const index = reports.findIndex(item => item.id === id);
                    reports[index] = updatedReport;
                    this._reports.next(reports);

                    // Update report
                    this._report.next(updatedReport);

                    return updatedReport;
                })
            ))
        )
    }

    /**
* Reject report
*/
    rejectReport(id: string, note: string) {
        return this.reports$.pipe(
            take(1),
            switchMap((reports) => this._httpClient.put<Report>(this.baseUrl + '/api/reports/' + id, { status: 'Rejected', note: note }).pipe(
                map((updatedReport) => {

                    // Find and replace updated report
                    const index = reports.findIndex(item => item.id === id);
                    reports[index] = updatedReport;
                    this._reports.next(reports);

                    // Update report
                    this._report.next(updatedReport);

                    return updatedReport;
                })
            ))
        )
    }
}