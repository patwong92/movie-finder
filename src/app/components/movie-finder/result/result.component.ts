import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { combineLatest, distinctUntilChanged, filter, Observable } from 'rxjs';
import { MovieFinderService, SearchResult } from '../movie-finder.service';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
    searchResult$!: Observable<SearchResult | null>;
    searchResultError$!: Observable<string>;
    pageNumber$: Observable<number>;

    pageNumber!: number;
    canPaginateLeft!: boolean;
    canPaginateRight!: boolean;

    @Output()
    paginateEvent: EventEmitter<number>;

    constructor(private movieFinderService: MovieFinderService) {
        this.pageNumber$ = this.movieFinderService.pageNumber$;
        this.searchResult$ = this.movieFinderService.searchResult$;
        this.searchResultError$ = this.movieFinderService.searchResultError$;
        this.paginateEvent = new EventEmitter();
    }

    ngOnInit(): void {
        combineLatest([this.pageNumber$, this.searchResult$])
            .pipe(
                filter(
                    (response) => !!response[0] && !!response[1]?.totalResults
                ),
                distinctUntilChanged()
            )
            .subscribe(([pageNumber, searchResult]) => {
                const { totalResults } = searchResult as SearchResult;
                this.canPaginateLeft = pageNumber > 1;
                this.canPaginateRight = pageNumber * 10 < +totalResults;
                this.pageNumber = pageNumber;
            });
    }

    handleMissingImage(event: Event) {
        (event.target as HTMLImageElement).src = 'assets/placeholder.png';
    }

    paginate(direction: 'left' | 'right'): void {
        if (direction === 'left') this.paginateEvent.emit(this.pageNumber - 1);
        if (direction === 'right') this.paginateEvent.emit(this.pageNumber + 1);
    }

    showImdbID(): void {
        // NOTE: Instructions say to have button do nothing
    }
}
