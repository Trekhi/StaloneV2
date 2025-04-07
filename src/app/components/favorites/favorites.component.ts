// favorites.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { UserComponent } from '../user/user.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, UserComponent]
})
export class FavoritesComponent implements OnInit {
  favoriteCharacters: any[] = [];
  private storageSub!: Subscription;


  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.storageSub = this.storageService.storageReady$.subscribe(ready => {
      if (ready) {
        this.loadFavorites();
      }
    });
  }

  async loadFavorites() {
    // Forzar una nueva carga desde el storage
    await this.storageService.loadFavorites();
    this.favoriteCharacters = this.storageService.getLocalPersonajes;
    console.log('Favoritos cargados en componente:', this.favoriteCharacters);
  }

  async ionViewWillEnter() {
    if (this.storageService.getLocalPersonajes) {
      await this.loadFavorites();
    }
  }

  ngOnDestroy() {
    if (this.storageSub) {
      this.storageSub.unsubscribe();
    }
  }
}