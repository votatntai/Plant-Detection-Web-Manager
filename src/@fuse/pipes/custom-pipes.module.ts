import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassStudentStatusPipe } from './status-class-student/status-class-student-style.pipe';
import { ClassStatusPipe } from './status-class-style/status-class-style.pipe';
import { ReportStatusStylePipe } from './report-status/report-status-style.pipe';

@NgModule({
    declarations: [ClassStudentStatusPipe, ClassStatusPipe, ReportStatusStylePipe],
    imports: [
        CommonModule
    ],
    exports: [ClassStudentStatusPipe, ClassStatusPipe, ReportStatusStylePipe]
})
export class CustomPipesModule { }