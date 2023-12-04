import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { ReportDetailComponent } from './details/report-detail.component';
import { ReportComponent } from './report.component';
import { ReportService } from './report.service';
import { ClassService } from '../classes/class.service';

export default [
    {
        path: '',
        component: ReportComponent,
        resolve: {
            data: () => inject(ReportService).getReports(),
            classses: () => inject(ClassService).getManagerClasses(),
        },
        children: [
            {
                path: ':id',
                component: ReportDetailComponent,
                resolve: {
                    data: (route: ActivatedRouteSnapshot) => inject(ReportService).getReport(route.params['id']),
                }
            }
        ]
    },
] as Routes;
