import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    concatMap,
    debounceTime,
    finalize,
    Observable,
    of,
    throwError,
} from 'rxjs';
import { environment } from '../../../environments/environment';

export interface SearchResult {
    Search: {
        Title: string;
        Year: string;
        imdbID: string;
        Type: string;
        Poster: string;
    }[];
    totalResults: string;
    Response: 'True';
}

export interface SearchResultError {
    Response: 'False';
    Error: string;
}

@Injectable({
    providedIn: 'root',
})
export class MovieFinderService {
    pageNumberSubject$: BehaviorSubject<number>;
    requestIsLoadingSubject$: BehaviorSubject<boolean>;
    searchResultSubject$: BehaviorSubject<SearchResult | null>;
    searchResultErrorSubject$: BehaviorSubject<string>;

    constructor(private http: HttpClient) {
        this.requestIsLoadingSubject$ = new BehaviorSubject(false);
        this.searchResultSubject$ = new BehaviorSubject<SearchResult | null>(
            null
        );
        this.searchResultErrorSubject$ = new BehaviorSubject('');
        this.pageNumberSubject$ = new BehaviorSubject(0);
    }

    get pageNumber$(): Observable<number> {
        return this.pageNumberSubject$.asObservable();
    }

    get pageNumber(): number {
        return this.pageNumberSubject$.value;
    }

    set pageNumber(num: number) {
        this.pageNumberSubject$.next(num);
    }

    get requestIsLoading$(): Observable<boolean> {
        return this.requestIsLoadingSubject$.asObservable();
    }

    get requestIsLoading(): boolean {
        return this.requestIsLoadingSubject$.value;
    }

    set requestIsLoading(status: boolean) {
        this.requestIsLoadingSubject$.next(status);
    }

    get searchResult$(): Observable<SearchResult | null> {
        return this.searchResultSubject$.asObservable();
    }

    get searchResult(): SearchResult | null {
        return this.searchResultSubject$.value;
    }

    set searchResult(result: SearchResult | null) {
        this.searchResultSubject$.next(result);
    }

    get searchResultError$(): Observable<string> {
        return this.searchResultErrorSubject$.asObservable();
    }

    get searchResultError(): string {
        return this.searchResultErrorSubject$.value;
    }

    set searchResultError(error: string) {
        this.searchResultErrorSubject$.next(error);
    }

    getMovies$(
        search: string,
        page: number = 1
    ): Observable<SearchResult | SearchResultError> {
        this.requestIsLoading = true;
        return this.http
            .get<SearchResult | SearchResultError>(environment.searchUrl, {
                params: {
                    apiKey: environment.apiKey,
                    s: search,
                    page,
                },
            })
            .pipe(
                debounceTime(200),
                concatMap((result) =>
                    result.Response === 'True'
                        ? of(result)
                        : throwError(() => new Error(result.Error))
                ),

                finalize(() => {
                    this.requestIsLoading = false;
                    this.pageNumber = page;
                })
            );
    }

    reset(): void {
        this.pageNumber = 0;
        this.searchResult = null;
        this.searchResultError = '';
        this.requestIsLoading = false;
    }
}
