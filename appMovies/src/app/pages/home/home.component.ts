import { Component, OnInit } from '@angular/core';
import { iMovie } from '../../interfaces/i-movie';
import { MoviesService } from '../../services/movies.service';
import { AuthService } from '../../auth/auth.service';
import { map, take } from 'rxjs';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  movies: iMovie[] = [];

  constructor(
    private moviesSvc: MoviesService,
    private authSvc: AuthService,
    private favoritesSvc: FavoritesService
  ) {}

  ngOnInit(): void {
    this.moviesSvc.getMovies().subscribe((movies) => (this.movies = movies));
  }

  clickLike(movie: iMovie) {
    this.authSvc.user$
      .pipe(
        map((user) => user?.id),
        take(1) // Completa la sottoscrizione dopo una sola emissione
      )
      .subscribe((userId) => {
        if (userId) {
          if (this.favoritesSvc.checkFavoriteMoviesOfUser(userId, movie.id)) {
            const newFavorite = {
              movie,
              userId,
            };

            this.favoritesSvc.addToFavorites(newFavorite).subscribe();
          }
        }
      });
  }
}
