import { FavoritesService } from './../../services/favorites.service';
import { Component, OnInit } from '@angular/core';
import { iFavorite } from '../../interfaces/i-favorite';
import { AuthService } from '../../auth/auth.service';
import { map, take } from 'rxjs';
import { iUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  favorites: iFavorite[] = [];

  users: iUser[] = [];

  constructor(
    private favoritesSvc: FavoritesService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    //recupero i preferiti dell'utente loggato
    this.authSvc.user$
      .pipe(
        take(1),
        map((user) => user?.id)
      )
      .subscribe((userId) => {
        if (!userId) return;

        this.favoritesSvc
          .getUserFavorites(userId)
          .subscribe((favorites) => (this.favorites = favorites));

        //recupero i dati dell'utente loggato
        this.authSvc
          .getAllUsers()
          .subscribe(
            (users) => (this.users = users.filter((user) => user.id === userId))
          );
      });
  }

  deleteFavorite(favorite: iFavorite) {
    this.favoritesSvc.removeFromFavorites(favorite).subscribe(() => {
      this.favorites = this.favorites.filter(
        (fav) => fav.movie.id !== favorite.movie.id
      );
    });
  }
}
