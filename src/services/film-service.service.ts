import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Films} from '../models/Films';

@Injectable({
    providedIn: 'root'
})
export class FilmServiceService {

    url = 'http://localhost:8080/';
    headersOption = new HttpHeaders()
        .set('Authorization', localStorage.getItem('_token'))
        .set('CurrentUser', localStorage.getItem('_currentUser'));

    constructor(private http: HttpClient) {

    }

    getFilms(): Observable<Films[]> {
        return this.http.get<Films[]>(this.url + 'home');
    }

    getTopTen(): Observable<Films[]> {
        return this.http.get<Films[]>(this.url + 'topTen');
    }

    getNewFilms(): Observable<Films[]> {
        return this.http.get<Films[]>(this.url + 'newFilms');
    }

    addFilm(film: FormData): Observable<Films> {
        return this.http.post<Films>(this.url + 'addfilm', film);
    }

    delFilm(film: number): Observable<Films[]> {
        return this.http.post<Films[]>(this.url + 'delfilm', film);
    }

    getFilmById(id: number): Observable<Films> {
        return this.http.post<Films>(this.url + 'getbyid', id, {headers: this.headersOption});
    }

    findByGenre(genre: string): Observable<Films[]> {
        return this.http.post<Films[]>(this.url + 'findByGenre', genre);
    }

    findSearchingFilm(filmName: string): Observable<Films[]> {
        return this.http.post<Films[]>(this.url + 'search', filmName);
    }

    delUserfilms(film: number): Observable<Films[]> {
        return this.http.post<Films[]>(this.url + 'deluserfilms', film, {headers: this.headersOption});
    }

    rating(rating, id): Observable<any> {
        const fd: FormData = new FormData();
        fd.append('idFilm', id);
        fd.append('rating', rating);
        return this.http.post<any>(this.url + 'rating', fd);
    }

    addComment(form: FormData) {
        return this.http.post(this.url + 'addComment', form, {headers: this.headersOption});
    }
}
