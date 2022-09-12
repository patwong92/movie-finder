import { Component } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { SearchResult } from './dtos/search-result.dto';
import { MovieFinderService } from './movie-finder.service';

@Component({
    selector: 'app-movie-finder',
    templateUrl: './movie-finder.component.html',
    styleUrls: ['./movie-finder.component.scss'],
})
export class MovieFinderComponent {
    query: string;
    requestIsLoading$: Observable<boolean>;
    searchResultExists$: Observable<boolean>;
    searchResultErrorExists$: Observable<boolean>;

    constructor(private movieFinderService: MovieFinderService) {
        this.query = '';
        this.requestIsLoading$ = this.movieFinderService.requestIsLoading$;
        this.searchResultExists$ = this.movieFinderService.searchResult$.pipe(
            map((result) => !!result)
        );
        this.searchResultErrorExists$ =
            this.movieFinderService.searchResultError$.pipe(
                map((result) => !!result)
            );
    }

    handleQuery(queryString: string): void {
        this.clearResult();
        this.query = queryString;
        this.movieFinderService
            .getMovies$(queryString)
            .pipe(take(1))
            .subscribe({
                next: (result) =>
                    (this.movieFinderService.searchResult =
                        result as SearchResult),

                error: (error) =>
                    (this.movieFinderService.searchResultError = error.message),
            });
    }

    handlePaginatedQuery(pageNumber: number): void {
        this.movieFinderService
            .getMovies$(this.query, pageNumber)
            .pipe(take(1))
            .subscribe({
                next: (result) =>
                    (this.movieFinderService.searchResult =
                        result as SearchResult),
                error: (error) =>
                    (this.movieFinderService.searchResultError = error.message),
            });
    }

    clearResult(): void {
        this.movieFinderService.reset();
    }
}
