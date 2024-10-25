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

  getFavoritesByUserId(userId: number): Observable<iFavorite[]> {
    return this.http.get<iFavorite[]>(`${this.favoritesUrl}?userId=${userId}`);
  }
}
