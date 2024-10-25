import { Component, OnInit } from '@angular/core';
import { iMovie } from '../../interfaces/i-movie';
import { MoviesService } from '../../services/movies.service';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs';
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

  click(movie: iMovie) {
    this.authSvc.user$.pipe(map((user) => user?.id)).subscribe((userId) => {
      if (userId) {
        const newFavorite = {
          movie,
          userId,
        };
        this.favoritesSvc.addToFavorites(newFavorite).subscribe();
      }
    });
  }
}
