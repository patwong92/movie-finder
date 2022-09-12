import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/movie-finder/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './components/movie-finder/result/result.component';
import { MovieFinderComponent } from './components/movie-finder/movie-finder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaginatorPipe } from './components/movie-finder/result/paginator.pipe';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        MovieFinderComponent,
        PaginatorPipe,
        ResultComponent,
        SearchComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
