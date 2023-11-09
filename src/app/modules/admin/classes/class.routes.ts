import { Routes } from '@angular/router';
import { ClassComponent } from 'app/modules/admin/classes/class.component';
import { ClassService } from './class.service';
import { inject } from '@angular/core';
import { ClassDetailComponent } from './details/class-detail.component';
import { initialDataResolver } from './details/class-detail.resolvers';

export default [
    {
        path: '',
        component: ClassComponent,
        resolve: {
            data: () => inject(ClassService).getClasses(),
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
