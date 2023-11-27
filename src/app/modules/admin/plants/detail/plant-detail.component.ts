import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-plant-detail',
    templateUrl: './plant-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, MatIconModule, NgIf, NgFor
    ],
})
export class PlantDetailComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}