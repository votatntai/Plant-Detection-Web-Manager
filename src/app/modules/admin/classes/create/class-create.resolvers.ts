import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LabelService } from '../../label/label.service';

export const getLabelsResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const labelService = inject(LabelService);

    return forkJoin([
        labelService.getLabels()
    ]);
};
