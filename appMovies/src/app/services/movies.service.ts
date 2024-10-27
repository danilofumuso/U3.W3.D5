import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iMovie } from '../interfaces/i-movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesUrl: string = environment.moviesUrl;
  favoritesUrl: string = environment.favoritesUrl;
  constructor(private http: HttpClient) {}

  getMovies(): Observable<iMovie[]> {
    return this.http.get<iMovie[]>(this.moviesUrl);
  }
}
