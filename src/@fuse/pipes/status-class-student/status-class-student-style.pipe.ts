import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'classStudentStatusStyle'
})
export class ClassStudentStatusPipe implements PipeTransform {

    transform(status: string): string {
        switch (status) {
            case 'Pending Approval':
                return 'text-orange-500 border-2 border-orange-500 px-3 rounded-full py-1';
            case 'Invited':
                return 'text-blue-500 border-2 border-blue-500 px-3 rounded-full py-1';
            case 'Enrolled':
                return 'text-green-500 border-2 border-green-500 px-3 rounded-full py-1';
            case 'Rejected':
                return 'text-red-500 border-2 border-red-500 px-3 rounded-full py-1';
            default:
                return '';
        }
    }
}
