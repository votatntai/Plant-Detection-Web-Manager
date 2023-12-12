import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { ClassService } from '../classes/class.service';
import { LabelService } from '../label/label.service';
import { ClassListComponent } from './class-list/class-list.component';
import { ReportDetailComponent } from './details/report-detail.component';
import { ClassLabelComponent } from './labels/class-label.component';
import { ReportImageComponent } from './report-image/report-image.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportComponent } from './report.component';
import { ReportService } from './report.service';

export default [
    {
        path: '',
        component: ReportComponent,
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },
            {
                path: 'list',
                component: ReportListComponent,
                resolve: {
                    data: () => inject(ReportService).getReports(),
                    classses: () => inject(ClassService).getManagerClasses(),
                },
            },
            {
                path: 'classes',
                component: ClassListComponent,
                resolve: {
                    classses: () => inject(ClassService).getManagerClasses(),
                },
            },
            {
                path: 'classes/:classId',
                component: ClassLabelComponent,
                resolve: {
                    data: (route: ActivatedRouteSnapshot) => inject(LabelService).getLabels(0, 10, route.params['classId']),
                },
            },
            {
                path: 'classes/:classId/labels/:labelId',
                component: ReportImageComponent,
                resolve: {
                    data: (route: ActivatedRouteSnapshot) => inject(ReportService).getReportsByLabelId(0, 50, route.params['labelId'], route.params['classId']),
                },
            }
        ]
    },
] as Routes;