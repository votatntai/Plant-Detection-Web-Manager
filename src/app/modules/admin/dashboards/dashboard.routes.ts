import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { DashboardComponent } from 'app/modules/admin/dashboards/dashboard.component';
import { DashboardService } from './dashboard.service';

export default [
    {
        path: '',
        component: DashboardComponent,
        resolve: {
            data: () => inject(DashboardService).getData(),
        },
    },
] as Routes;
