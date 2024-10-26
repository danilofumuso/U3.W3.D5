import { iFavorite } from './../interfaces/i-favorite';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { iFavorite } from '../interfaces/i-favorite';
import { iMovie } from '../interfaces/i-movie';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesUrl = environment.favoritesUrl;

  constructor(private http: HttpClient) {}

  addToFavorites(newFavorite: iFavorite): Observable<iFavorite> {
    return this.http.post<iFavorite>(this.favoritesUrl, newFavorite);
  }

  removeFromFavorites(favoriteId: number): Observable<void> {
    return this.http.delete<void>(`${this.favoritesUrl}/${favoriteId}`);
  }

  getUserFavorites(userId: number): Observable<iFavorite[]> {
    return this.http.get<iFavorite[]>(`${this.favoritesUrl}?userId=${userId}`);
  }

  checkFavoriteMoviesOfUser(userId: number, movieId: number): boolean {
    let userFavorites: iFavorite[] = [];

    this.getUserFavorites(userId).subscribe(
      (movies) => (userFavorites = movies)
    );

    userFavorites.filter((movie) => movie.id === movieId);

    if (userFavorites.length > 0) return false;

    return true;
  }
}
