import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'paginator',
})
export class PaginatorPipe implements PipeTransform {
    transform(totalResults: number, page: number, limit: number): unknown {
        const numberOfCompletePages = Math.floor(totalResults / limit);
        return `Page ${page} of ${
            totalResults % 10 > 0
                ? numberOfCompletePages + 1
                : numberOfCompletePages
        }`;
    }
}
