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
