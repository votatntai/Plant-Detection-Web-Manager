import { Routes } from '@angular/router';
import { ClassComponent } from 'app/modules/admin/classes/class.component';
import { ClassService } from './class.service';
import { inject } from '@angular/core';
import { ClassDetailComponent } from './details/class-detail.component';
import { initialDataResolver } from './details/class-detail.resolvers';
import { LabelService } from '../label/label.service';

export default [
    {
        path: '',
        component: ClassComponent,
        resolve: {
            classses: () => inject(ClassService).getClasses(),
            labels: () => inject(LabelService).getLabels(),
        },
        children: [
            {
                path: ':id',
                component: ClassDetailComponent,
                resolve: {
                    classDetail: initialDataResolver
                }
            },
        ]
    },
] as Routes;
