import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reportStatusStyle'
})
export class ReportStatusStylePipe implements PipeTransform {

    transform(status: string): string {
        switch (status) {
            case 'Pending':
                return 'text-orange-500 border-2 border-orange-500 px-3 rounded-full py-1';
            case 'Approved':
                return 'text-blue-500 border-2 border-blue-500 px-3 rounded-full py-1';
            case 'Rejected':
                return 'text-red-500 border-2 border-red-500 px-3 rounded-full py-1';
            default:
                return '';
        }
    }
}
