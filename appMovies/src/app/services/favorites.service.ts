import { iFavorite } from './../interfaces/i-favorite';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesUrl = environment.favoritesUrl;

  constructor(private http: HttpClient) {}

  addToFavorites(newFavorite: iFavorite): Observable<iFavorite> {
    return this.http.post<iFavorite>(this.favoritesUrl, newFavorite);
  }

  removeFromFavorites(favorite: iFavorite): Observable<void> {
    return this.http.delete<void>(`${this.favoritesUrl}/${favorite.id}`);
  }

  getUserFavorites(userId: number): Observable<iFavorite[]> {
    return this.http.get<iFavorite[]>(`${this.favoritesUrl}?userId=${userId}`);
  }
}
