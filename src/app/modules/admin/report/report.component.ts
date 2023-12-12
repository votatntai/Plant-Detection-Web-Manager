import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { Class } from 'app/types/class.type';
import { Report } from 'app/types/report.type';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ClassService } from '../classes/class.service';

@Component({
    selector: 'app-report',
    templateUrl: 'report.component.html',
    styleUrls: ['report.component.css'],
    standalone: true,
    imports: [CommonModule, MatProgressBarModule, MatIconModule, RouterModule
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                subscriptSizing: 'dynamic'
            }
        }
    ],
})

export class ReportComponent implements OnInit {

    reports$: Observable<Report[]>;
    classes: Class[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _classService: ClassService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        // Get list of class
        this._classService.classes$.pipe(takeUntil(this._unsubscribeAll))
            .subscribe((classes: Class[]) => {

                // Update the classes
                this.classes = classes;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }
}