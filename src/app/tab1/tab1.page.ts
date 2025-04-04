import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonFooter } from '@ionic/angular/standalone';
//import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RickMoryService } from '../services/rick-mory.service';
import { SwiperSlidesComponent } from '../components/elements/swiper-slides/swiper-slides.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonFooter, IonHeader, IonToolbar, IonContent, HeaderComponent, FooterComponent, SwiperSlidesComponent],
})
export class Tab1Page {

  //Variables
  personajes: any[] = [];
  url_next: string = '';

  constructor(private rickMortyService :RickMoryService ) {}
  ngOnInit() {
    this.cargarPersonajes();
  }

  cargarPersonajes() {
    this.rickMortyService.getCharactersA([1,2,3,4,5,7]).subscribe({
      next:(data) =>{
        //console.log("Respuesta de la API:", data);
        this.personajes = data 
        console.log("Respuesta de la API:", this.personajes);
      },
      error:(err) =>{
        console.error('Error al cargar episodios:', err);
      }
    })
  }

}
