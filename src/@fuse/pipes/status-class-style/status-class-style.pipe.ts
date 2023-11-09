import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'classStatusStyle'
})
export class ClassStatusPipe implements PipeTransform {

    transform(status: string): string {
        switch (status) {
            case 'Opening':
                return 'text-blue-500 border-2 border-blue-500 px-3 rounded-full py-1';
            case 'Completed':
                return 'text-green-500 border-2 border-green-500 px-3 rounded-full py-1';
            case 'Closed':
                return 'text-gray-500 border-2 border-gray-500 px-3 rounded-full py-1';
            case 'Rejected':
                return 'text-red-500 border-2 border-red-500 px-3 rounded-full py-1';
            case 'Pending Approval':
                return 'text-orange-500 border-2 border-orange-500 px-3 rounded-full py-1';
            case 'Cancelled':
                return 'text-purple-500 border-2 border-purple-500 px-3 rounded-full py-1';
            default:
                return '';
        }
    }
}
