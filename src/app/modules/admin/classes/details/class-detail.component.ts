import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseCardComponent } from '@fuse/components/card';
import { CustomPipesModule } from '@fuse/pipes/custom-pipes.module';
import { QRCodeModule } from 'angularx-qrcode';
import { ClassStudent } from 'app/types/class-student.type';
import { Class } from 'app/types/class.type';
import { Pagination } from 'app/types/pagination.type';
import { ClassService } from '../class.service';

@Component({
    selector: 'app-class-detail',
    templateUrl: 'class-detail.component.html',
    standalone: true,
    styleUrls: ['class-detail-component.css'],
    imports: [MatIconModule, FuseCardComponent, CommonModule, MatButtonModule, CustomPipesModule, FuseAlertComponent, QRCodeModule]
})

export class ClassDetailComponent implements OnInit {

    class: Class;
    classStudents: ClassStudent[];
    studentsPagination: Pagination;

    constructor(
        public matDialogRef: MatDialogRef<ClassDetailComponent>,
        private _classService: ClassService,
    ) { }

    ngOnInit() {
        this._classService.class$.subscribe(iClass => {
            this.class = iClass;
        })
        this._classService.classStudents$.subscribe(student => {
            this.classStudents = student;
        });
    }
}