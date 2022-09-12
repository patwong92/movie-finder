import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MovieFinderService } from '../movie-finder.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
    form: FormGroup;
    requestIsLoading$: Observable<boolean>;

    @Output()
    submitEvent: EventEmitter<string>;

    @Output()
    clearEvent: EventEmitter<void>;

    constructor(
        private fb: FormBuilder,
        private movieFinderService: MovieFinderService
    ) {
        this.form = this.fb.group({
            search: this.fb.control('', [Validators.required]),
        });
        this.submitEvent = new EventEmitter();
        this.clearEvent = new EventEmitter();
        this.requestIsLoading$ = this.movieFinderService.requestIsLoading$;
    }

    submit(): void {
        const searchValue = this.form.get('search')!.value;
        this.submitEvent.emit(searchValue);
    }

    clear(): void {
        this.form.reset();
        this.clearEvent.emit();
    }
}
