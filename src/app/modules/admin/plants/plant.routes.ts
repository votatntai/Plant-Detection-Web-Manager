import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { PlantComponent } from 'app/modules/admin/plants/plant.component';
import { PlantService } from './plant.service';

export default [
    {
        path: '',
        component: PlantComponent,
        resolve: {
            data: () => inject(PlantService).getPlants(),
        },
        // children: [
        //     {
        //         path: ':id',
        //         component: PlantDetailComponent,
        //         resolve: {
        //             plantDetail: initialDataResolver
        //         }
        //     },
        // ]
    },
] as Routes;
