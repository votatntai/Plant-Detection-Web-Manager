import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassStudent } from 'app/types/class-student.type';
import { Class } from 'app/types/class.type';
import { Pagination } from 'app/types/pagination.type';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClassService {

    private baseUrl = environment.baseUrl;

    private _class: BehaviorSubject<Class | null> = new BehaviorSubject(null);
    private _classStudents: BehaviorSubject<ClassStudent[] | null> = new BehaviorSubject(null);
    private _classes: BehaviorSubject<Class[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for class
 */
    get class$(): Observable<Class> {
        return this._class.asObservable();
    }

    /**
* Getter for class students
*/
    get classStudents$(): Observable<ClassStudent[]> {
        return this._classStudents.asObservable();
    }

    /**
     * Getter for classes
     */
    get classes$(): Observable<Class[]> {
        return this._classes.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<Pagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get classes
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getClasses(pageNumber: number = 0, pageSize: number = 10, search?: string, status?: string):
        Observable<{ pagination: Pagination; data: Class[] }> {
        return this._httpClient.get<{ pagination: Pagination; data: Class[] }>(this.baseUrl + '/api/classes/managers', {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                ...(status !== undefined && status !== null && { status }),
                ...(search !== undefined && search !== null && { name: search }),
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._classes.next(response.data);
            }),
        );
    }

    /**
* Create class
*/
    createClass(data) {
        return this.classes$.pipe(
            take(1),
            switchMap((classes) => this._httpClient.post<Class>(this.baseUrl + '/api/classes', data).pipe(
                map((newClass) => {

                    // Update class list with current page size
                    this._classes.next([newClass, ...classes].slice(0, this._pagination.value.pageSize));

                    return newClass;
                })
            ))
        )
    }

    /**
* Get class by id
*/
    getClass(id: string) {
        return this._httpClient.get<Class>(this.baseUrl + '/api/classes/' + id).pipe(tap((response) => {
            this._class.next(response);
        }))
    }

    /**
    * Update class
    */
    updateClass(id: string, data) {
        return this.classes$.pipe(
            take(1),
            switchMap((classes) => this._httpClient.put<Class>(this.baseUrl + '/api/classes/' + id, data).pipe(
                map((updatedClass) => {

                    // Find and replace updated class
                    const index = classes.findIndex(item => item.id === id);
                    classes[index] = updatedClass;
                    this._classes.next(classes);

                    // Update class
                    this._class.next(updatedClass);

                    return updatedClass;
                })
            ))
        )
    }

    /**
* Reject class
*/
    openClass(id: string) {
        return this.classes$.pipe(
            take(1),
            switchMap((classes) => this._httpClient.put<Class>(this.baseUrl + '/api/classes/' + id, { status: 'Opening' }).pipe(
                map((updatedClass) => {

                    // Find and replace updated class
                    const index = classes.findIndex(item => item.id === id);
                    classes[index] = updatedClass;
                    this._classes.next(classes);

                    // Update class
                    this._class.next(updatedClass);

                    return updatedClass;
                })
            ))
        )
    }

    /**
* Close class
*/
    closeClass(id: string) {
        return this.classes$.pipe(
            take(1),
            switchMap((classes) => this._httpClient.put<Class>(this.baseUrl + '/api/classes/' + id, { status: 'Closed' }).pipe(
                map((updatedClass) => {

                    // Find and replace updated class
                    const index = classes.findIndex(item => item.id === id);
                    classes[index] = updatedClass;
                    this._classes.next(classes);

                    // Update class
                    this._class.next(updatedClass);

                    return updatedClass;
                })
            ))
        )
    }

    getClassStudents(id: string): Observable<{ pagination: Pagination; data: ClassStudent[] }> {
        return this._httpClient.get<{ pagination: Pagination; data: ClassStudent[] }>(this.baseUrl + '/api/classes/' + id + '/students').pipe(
            tap((response) => {
                this._classStudents.next(response.data);
            }),
        );
    }

    approveStudentToJoinClass(classId: string, studentId: string) {
        return this.classes$.pipe(
            take(1),
            switchMap(() => this._httpClient.put<any>(this.baseUrl + '/api/classes/' + classId + '/approve-student/' + studentId, null).pipe(
                map((classStudent) => {

                    // Find and replace updated class
                    var currentClassStudents = this._classStudents.value;
                    const index = currentClassStudents.findIndex(item => item.student.id === studentId);
                    currentClassStudents[index] = classStudent;
                    this._classStudents.next(currentClassStudents);

                    return classStudent;
                })
            ))
        )
    }
}